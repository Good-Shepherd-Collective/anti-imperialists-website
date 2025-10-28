import { YOUTUBE_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

const CHANNEL_HANDLE = 'penandmachete';
const MAX_RESULTS = 12;

// Disable prerendering for this page since it fetches dynamic YouTube data
export const prerender = false;

export async function load() {
  try {
    // First, get the channel ID from the handle
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=@${CHANNEL_HANDLE}&type=channel&key=${YOUTUBE_API_KEY}`
    );

    if (!searchResponse.ok) {
      console.error('YouTube search API error:', await searchResponse.text());
      throw error(500, 'Failed to fetch channel information');
    }

    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      throw error(404, 'Channel not found');
    }

    const channelId = searchData.items[0].id.channelId;

    // Fetch the latest videos from the channel
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}&type=video`
    );

    if (!videosResponse.ok) {
      console.error('YouTube videos API error:', await videosResponse.text());
      throw error(500, 'Failed to fetch videos');
    }

    const videosData = await videosResponse.json();

    // Get video details including duration
    const videoIds = videosData.items.map(item => item.id.videoId).join(',');
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,statistics`
    );

    if (!detailsResponse.ok) {
      console.error('YouTube details API error:', await detailsResponse.text());
      throw error(500, 'Failed to fetch video details');
    }

    const detailsData = await detailsResponse.json();

    // Combine video data with details
    const episodes = videosData.items.map((item, index) => {
      const details = detailsData.items.find(d => d.id === item.id.videoId);

      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
        publishedAt: item.snippet.publishedAt,
        duration: details?.contentDetails?.duration || 'PT0M0S',
        viewCount: details?.statistics?.viewCount || '0',
        number: videosData.items.length - index // Reverse numbering
      };
    });

    return {
      episodes,
      featuredEpisode: episodes[0] || null
    };
  } catch (err) {
    console.error('Error fetching YouTube data:', err);

    // Return empty data if YouTube API is not configured
    if (err.message?.includes('API') || !YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
      console.warn('YouTube API key not configured. Using placeholder data.');
      return {
        episodes: [],
        featuredEpisode: null,
        apiKeyMissing: true
      };
    }

    throw err;
  }
}
