
import React from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

type StructuredSchema =
    | Record<string, unknown>
    | Record<string, unknown>[];

interface SEOHeadProps {
    title: string;
    description: string;
    path?: string;
    schema?: StructuredSchema;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title,
    description,
    path = '/',
    schema,
}) => {
    useDocumentMeta({
        title,
        description,
        path,
        structuredData: schema,
    });

    return null;
};

export default SEOHead;
