// Type definitions for FineUploader 5.x.x
// Project: http://fineuploader.com/
// Definitions by: Sukhdeep Singh <https://github.com/Sukh9212>


declare namespace FineUploader {

    /**
     * type for `resizeInfo` object
     */
    interface ResizeInfo {
        /**
         * The original `File` or `Blob` object, if available.
         */
        blob?: File | Blob;
        /**
         * Desired height of the image after the resize operation.
         */
        height?: number;
        /**
         * The original HTMLImageElement object, if available.
         */
        image?: HTMLImageElement;
        /**
         * `HTMLCanvasElement` element containing the original image data (not resized).
         */
        sourceCanvas?: HTMLCanvasElement;
        /**
         * `HTMLCanvasElement` element containing the `HTMLCanvasElement` that should contain the resized image.
         */
        targetCanvas?: HTMLCanvasElement;
        /**
         * Desired width of the image after the resize operation.
         */
        width?: number;
    }

    /**
     * Callback type for `customResizer` parameter in `drawThumbnail` method
     */
    interface CustomResizerCallBack {
        (resizeInfo: ResizeInfo): Promise<any>;
    }

    /**
     * A BlobWrapper object type
     */
    interface BlobWrapper {
        /**
         * 	the bytes of the `Blob` object being uploaded
         */
        blob: Blob;
        /**
         * 	the name of the `Blob`
         */
        name: string;
    }

    /**
     * A CanvasWrapper Object type
     */
    interface CanvasWrapper {
        /**
         * 	the <`canvas`> to be converted to a file & then uploaded
         */
        canvas: HTMLCanvasElement;
        /**
         * the name to assign to the created file
         */
        name: string;
        /**
         * 1-100 value indicating the desired quality of the converted file (only for image/jpeg)
         */
        quality: number;
        /**
         * MIME type of the file to create from this <`canvas`>
         */
        type: MimeType;
    }

    /**
     * Resumable file object type
     */
    interface ResumableFileObject {
        /**
         * 	filename
         */
        name: string;
        /**
         * 	the unique id
         */
        uuid: number;
        /**
         * the index of the part where the resume will start from
         */
        partIdx: number;
    }

    /**
     * type for getUploads method's filter parameter
     */
    interface UploadFilter {
        /**
         * the id of the file
         */
        id: number | number[];
        /**
         * the uuid of the file
         */
        uuid: number | number[];
        /**
         * status of the file 
         */
        status: string | string[];
    }

    /**
     * type for getUploads method's return object
     */
    interface FoundUploadItems extends UploadFilter {
        /**
         * the name of the file
         */
        name: string;
        /**
         * the size of the file
         */
        size: string;
    }

    interface ScaleImageOptions {
        /**
         * required
         */
        maxSize: number;
        /**
         * defaults to `true`
         */
        orient?: boolean;
        /**
         * defaults to the type of the reference image
         */
        type?: string;
        /**
         * number between `0` and `100`, defaults to `80`
         */
        quality?: number;
        /**
         * defaults to `false`
         */
        includeExif?: boolean;
        /**
         * Ignored if the current browser does not support image previews.
         * If you want to use an alternate library to resize the image, you must contribute a function for this option that returns a `Promise`. 
         * Once the resize is complete, your promise must be fulfilled.
         * You may, of course, reject your returned `Promise` is the resize fails in some way.
         */
        customResizer?: CustomResizerCallBack;
    }



    interface qq {

        /* ======================================= CORE METHODS ========================================== */
        /**
         * Submit one or more files to the uploader
         * @param any[] files : An array of `File`s, `<input>`s, `Blob`s, `BlobWrapper` objects, `<canvas>`es, or `CanvasWrapper` objects. You may also pass in a `FileList`.
         * @param any params : A set of parameters to send with the file to be added
         * @param string endpoint : The endpoint to send this file to
         */
        addFiles(files: File[] | HTMLInputElement[] | Blob[] | BlobWrapper | HTMLCanvasElement[] | CanvasWrapper | FileList, params?: any, endpoint?: string): void;

        /**
         * Submit one or more canned/initial files to the uploader
         * @param any[] initialFiles : An array of objects that describe files already on the server
         */
        addInitialFiles(initialFiles: any[]): void;

        /**
         * Cancel the queued or currently uploading item which corresponds to the id
         * @param number id : The file's id
         */
        cancel(id: number): void;

        /**
         * Cancels all queued or currently uploading items
         */
        cancelAll(): void;

        /**
         * Clears the internal list of stored items. Only applies when autoUpload is false
         */
        clearStoredFiles(): void;

        /**
         * Attempts to continue a paused upload
         * @param number id : A file id
         * @returns boolean : `true` if attempt was successful.
         */
        continueUpload(id: number): boolean;

        /**
         * Send a delete request to the server for the corresponding file id
         * @param number id : The file's id
         */
        deleteFile(id: number): void;



        /**
         * Draws a thumbnail
         * @param number id : The id of the image file
         * @param HTMLElement targetContainer : The element where the image preview will be drawn. Must be either an <img> or <canvas> element
         * @param number maxSize : The maximum dimensions (for width and height) you will allow this image to scale to
         * @param boolean fromServer : true if the image data will come as a response from the server rather than be generated client-side
         * @param CustomResizerCallBack customResizer : Ignored if the current browser does not support image previews. 
         *                                              If you want to use an alternate library to resize the image, you must contribute a function for this option that returns a `Promise`. 
         *                                              Once the resize is complete, your promise must be fulfilled. 
         *                                              You may, of course, reject your returned `Promise` is the resize fails in some way.
         * @returns Promise: Fulfilled by passing the container back into the success callback after the thumbnail has been rendered. 
         *                   If the thumbnail cannot be rendered, failure callbacks will be invoked instead, passing an object with `container` and `error` properties.
         */
        drawThumbnail(id: number, targetContainer: HTMLElement, maxSize?: number, fromServer?: boolean, customResizer?: CustomResizerCallBack): Promise<any>;

        /**
         * Returns the button container element associated with a file
         * @param number id : The file id
         * @returns HTMLElement : The button container element associated with a file, or `undefined` if the file was not submitted via a Fine Uploader controlled upload button.
         */
        getButton(id): HTMLElement;

        /**
         * Returns the file identified by the id. File API browsers only
         * @param number id : The file id
         * @returns File | Blob : A `File` or `Blob` object
         */
        getFile(id: number): File | Blob;

        /**
         * Returns the endpoint associated with a particular file, or the current catch-all endpoint for all files (if no ID is specified).
         * @param number id : The ID of the associated file
         * @return string | string[] : endpoint associated with a particular file, or the current catch-all endpoint for all files (if no ID is specified).
         */
        getEndpoint(id?: number): string | string[];

        /**
         * Returns the number of items that are either currently uploading or waiting for an available connection (`qq.status.QUEUED`). 
         * If called inside of a cancel event handler, then this method will return a value that includes the upload associated with the cancel event handler. 
         * This is because the upload will not be canceled until the event handler returns.
         * @returns number : The number of items that are currently uploading or queued
         */
        getInProgress(): number;

        /**
         * Returns the name of the file with the associated id
         * @param number id : The file id
         * @returns string : Returns the name of the file identified by the id.
         */
        getName(id: number): string;

        /**
         * Get the number of items that have been successfully uploaded and have not been deleted
         * @returns number : The number of items that have been successfully uploaded and not deleted
         */
        getNetUploads(): number;

        /**
         * Get the ID of the parent file for this scaled file
         * @param number scaledFileId : The ID of a scaled image file
         * @returns number : Returns the ID of the scaled image's parent file. `null` if this is not a scaled image or a parent cannot be located
         */
        getParentId(scaledFileId: number): number;

        /**
         * Returns the number of remaining allowed items that may be submitted for upload based on `validation.itemLimit`.
         */
        getRemainingAllowedItems(): number;

        /**
         * Returns an array of potentially resumable items
         * @returns ResumableFileObject[] : An array of resumable items
         */
        getResumableFilesData(): ResumableFileObject[];

        /**
         * Returns the size of the item with the associated id
         * @param number id : The file id
         * @returns number : The size of the file with the corresponding id
         */
        getSize(id: number): number;

        /**
         * Return information about all the items that have been submitted to the uploader
         * @param UploadFilter filter : An object which indicates which keys and values must be present in an upload to be returned
         * @return FoundUploadItems | FoundUploadItems [] : A list of items or a single item that has been filtered/found. 
         *                                                  This returns an array only when there is a potential for the operation to return more than one file in the result set.
         *                                                  This excludes queries for a specific, single ID or UUID. All other queries will return an array
         */
        getUploads(filter: UploadFilter): FoundUploadItems | FoundUploadItems[];

        /**
         * Returns the UUID of the item with the associated id
         * @param number id : The file id
         * @returns string : A level 4 UUID which identifies the corresponding file
         */
        getUuid(id: number): string;

        /**
         * Output a message to the console, if possible
         * @param string message : The message to print
         * @param string level : The level to output the message at
         */
        log(message: string, level?: string): void;

        /**
         * Attempts to pause an in-progress upload
         * @param number id : The file id
         * @returns boolean : `true` if the attempt was successful. `false` otherwise
         */
        pauseUpload(id: number): boolean;

        /**
         * Reset Fine Uploader
         */
        reset(): void;

        /**
         * Attempt to upload a specific item again
         * @param number id : The file id
         */
        retry(id: number): void;

        /**
         * Generates a scaled version of a submitted image file
         * @param number id : The id of the image file
         * @param ScaleImageOptions option : Information about the scaled image to generate
         * @returns Promise<any> : Fulfilled by passing the scaled image as a `Blob` back into the success callback after the original image has been scaled. 
         *                         If the scaled image cannot be generated, the failure callback will be invoked instead
         */
        scaleImage(id: number, options: ScaleImageOptions): Promise<any>;

        /**
         * Set custom headers for an upload request. Pass in a file id to make the headers specific to that file
         * @param any customHeaders : The custom headers to include in the upload request. Fine Uploader may also send some other required headers
         * @param number id : The file id
         */
        setCustomHeaders(customHeaders: any, id?: number): void;

        /**
         * Modify the location where upload requests should be directed. Pass in a file id to change the endpoint for that specific item
         * @param string path : A valid URI where upload requests will be sent
         * @param number | HTMLElement identifier : An integer or HTMLElement corresponding to a file
         */
        setEndpoint(path: string, identifier?: number | HTMLElement): void;

        /**
         * Set custom headers for a delete file request. Pass in a file id to make the headers specific to that file
         * @param any customHeaders : The custom headers to include in the upload request. Fine Uploader may also send some other required headers
         * @param number id : The file id
         */
        setDeleteFileCustomHeaders(customHeaders: any, id?: number): void;

        /**
         * Modify the location where delete requests should be directed. Pass in a file id to change the endpoint for that specific item
         * @param string path : A valid URI where delete requests will be sent
         * @param number | HTMLElement identifier : An integer or HTMLElement corresponding to a file
         */
        setDeleteFileEndpoint(path: string, identifier?: number | HTMLElement): void;

        /**
         * Set the parameters for a delete request. Pass in a file id to make the parameters specific to that file
         * @param any params : The parameters to include in the delete request
         * @param number id : The file id
         */
        setDeleteFileParams(params: any, id?: number): void;

        /**
         * Change the `validation.itemLimit` option set during construction/initialization
         * @param number newItemLimit : The new file count limit
         */
        setItemLimit(newItemLimit: number): void;

        /**
         * Bind a `<form>` to Fine Uploader dynamically
         * @param HTMLFormElement | string formElementOrId : A form element or a form element's ID
         */
        setForm(formElementOrId: HTMLFormElement | string): void;

        /**
         * Change the name of a file
         * @param number id: The file id
         * @param string name : The new file name
         */
        setName(id: number, name: string): void;

        /**
         * Set the parameters for an upload request. Pass in a file id to make the parameters specific to that file
         * @param any params : The parameters to include in the upload request
         * @param number id : The file id
         */
        setParams(params: any, id?: number): void;

        /**
         * Change the UUID of a file         
         * @param number id : The file id
         * @param string uuid : The new file UUID
         */
        setUuid(id: number, uuid: string): void;

        /**
         * Begin uploading all queued items. Throws a `NoFilesError` if there are no items to upload
         */
        uploadStoredFiles(): void;

        /* ======================================= END - CORE METHODS ========================================== */

        /* ======================================= UI METHODS ========================================== */

        /**
         * Mark `element` as a drop zone
         * @param HTMLElement element : The element to mark as a drop zone
         */
        addExtraDropzone(element: HTMLElement): void;

        /**
         * Returns the (drop zone) element where the file was dropped. Undefined if drop event was not involved
         * @param number id : The file id
         * @returns HTMLElement : The drop zone element where the file was dropped
         */
        getDropTarget(id: number): HTMLElement;

        /**
         * Returns the file `id` associated with an `HTMLElement`
         * @param HTMLElement element : Returns the ID of the associated file, given a file container element or a child of a file container element
         * @returns number : the id of the file
         */
        getId(element: HTMLElement): number;

        /**
         * Returns the `HTMLElement` associated with the file id
         * @param number id : The file id
         * @returns HTMLElement : The `HTMLElement` that is associated with the file id
         */
        getItemByFileId(id: number): HTMLElement;

        /**
         * Used to un-mark an `element` as a drop zone
         * @param HTMLElement element : The element to un-mark as a drop zone
         */
        removeExtraDropzone(element: HTMLElement): void;

        /* ======================================= END - UI METHODS ========================================== */



        /* ===================================== S3 METHODS ============================================== */
        /**
         * Retrieve the S3 bucket name associated with the passed file (id). Note that the bucket name is not available before the file has started uploading
         * @param number fileId : An ID corresponding to a file
         * @returns string : The S3 bucket name associated with the passed file (id)
         */
        getBucket(fileId: number): string;

        /* ===================================== END - S3 METHODS ============================================== */




        /* ===================================== AZURE METHODS ============================================== */



        /* ===================================== END - AZURE METHODS ============================================== */
    }

}

declare var qq: FineUploader.qq;