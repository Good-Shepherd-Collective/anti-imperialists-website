import { AsteriskIcon, DocumentTextIcon, EditIcon, BookIcon, BlockContentIcon } from '@sanity/icons'

export const structure = (S) =>
    S.list()
        .title('AISC Site')
        .items([
            // Points of Unity Singleton
            S.listItem()
                .title('Points of Unity')
                .id('pointsOfUnity')
                .icon(AsteriskIcon)
                .child(
                    S.editor()
                        .id('pointsOfUnity')
                        .schemaType('pointsOfUnity')
                        .documentId('pointsOfUnity')
                ),
            // Submission Instructions Singleton
            S.listItem()
                .title('Submission Instructions')
                .id('submissionInstructions')
                .icon(DocumentTextIcon)
                .child(
                    S.editor()
                        .id('submissionInstructions')
                        .schemaType('submissionInstructions')
                        .documentId('submissionInstructions')
                ),
            // Editorial Statement Singleton
            S.listItem()
                .title('Editorial Statement')
                .id('editorialStatement')
                .icon(EditIcon)
                .child(
                    S.editor()
                        .id('editorialStatement')
                        .schemaType('editorialStatement')
                        .documentId('editorialStatement')
                ),
            // Volumes with nested Blog Posts
            S.listItem()
                .title('Volumes & Blog Posts')
                .id('volumesAndBlogs')
                .icon(BookIcon)
                .child(
                    S.documentTypeList('volume')
                        .title('Volumes')
                        .child(volumeId =>
                            S.list()
                                .title('Volume Content')
                                .items([
                                    // Volume Details
                                    S.listItem()
                                        .title('Volume Details')
                                        .icon(BookIcon)
                                        .child(
                                            S.editor()
                                                .id(volumeId)
                                                .schemaType('volume')
                                                .documentId(volumeId)
                                        ),
                                    // Blog Posts for this Volume
                                    S.listItem()
                                        .title('Blog Posts')
                                        .icon(BlockContentIcon)
                                        .child(
                                            S.documentList()
                                                .title('Blog Posts')
                                                .schemaType('blog')
                                                .filter('_type == "blog" && (references($volumeId) || !defined(volume))')
                                                .params({ volumeId })
                                                .defaultOrdering([{ field: 'order', direction: 'asc' }, { field: 'publishedAt', direction: 'desc' }])
                                        ),
                                ])
                        )
                ),
            // Filter out singletons, blog, and volume from other document types
            ...S.documentTypeListItems().filter(
                (listItem) => !['pointsOfUnity', 'submissionInstructions', 'editorialStatement', 'blog', 'volume'].includes(listItem.getId())
            )
        ])