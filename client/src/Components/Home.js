import FileUpload from "./FileUpload";

export default function Home () {
    return (
        <>
            <h4 className='display-4 text-center mb-4'>
            <i class="far fa-image"></i> React File Upload
            </h4>
            <FileUpload />
        </>
    )
}