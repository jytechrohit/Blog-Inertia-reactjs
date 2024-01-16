import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/inertia-react";
import CKEditorComponent from "../components/CKEditorComponent";

const CKEditorPage = () => {
    const { data, setData } = usePage().props;

    // Check if data is available before rendering CKEditor
    if (!data || !data.content) {
        return <div>Loading...</div>; // You can render a loading message or component
    }

    return (
        <div>
            <h1>CKEditor Page</h1>
            <CKEditorComponent
                value={data.content}
                onChange={(value) => setData("content", value)}
            />
        </div>
    );
};

export default CKEditorPage;
