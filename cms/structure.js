import { AsteriskIcon, DocumentTextIcon, EditIcon } from '@sanity/icons'

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
            // Filter out singletons from other document types
            ...S.documentTypeListItems().filter(
                (listItem) => !['pointsOfUnity', 'submissionInstructions', 'editorialStatement'].includes(listItem.getId())
            )
        ])