import { Button, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { getFileNameFromUrl } from "../../utils/formatString.js";
import { Document, Page } from "react-pdf";
// import "@react-pdf-viewer/core/lib/styles/index.css";
import { useState } from "react";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

function PdfShow({ pdf, onDocumentLoadSuccess }) {
    const [open, setOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1); // Initialize with default page number
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDocumentLoadSuccess = ({ numPages }) => {
        if (onDocumentLoadSuccess) {
            onDocumentLoadSuccess(numPages);
        }
    };

    return (
        <div>
            <Button onClick={handleOpen}>
                <p>{getFileNameFromUrl(pdf)}</p>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Document
                        file={pdf}
                        onLoadSuccess={({ numPages }) => {
                            handleDocumentLoadSuccess({ numPages });
                        }}
                        error="Failed to load Lecture"
                        onError={(error) => console.error(error)}
                    >
                        <Page
                            pageNumber={pageNumber}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                        />
                    </Document>
                </Box>
            </Modal>
        </div>
    );
}

export default PdfShow;
