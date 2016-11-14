// Type definitions for FineUploader 5.x.x
// Project: http://fineuploader.com/
// Definitions by: Sukhdeep Singh <https://github.com/SinghSukhdeep>


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
     * Resumable file object type for S3
     */
    interface S3ResumableFileObject extends ResumableFileObject {
        /**
         * The associated object's S3 key
         */
        key: string;
    }

    /**
     * Resumable file object type for Azure
     */
    interface AzureResumableFileObject extends ResumableFileObject {
        /**
         * The associated file's blob name in Azure Blob Storage
         */
        key: string;
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

    /**
     * type for S3's bucket object property 
     */
    interface BucketFunction {
        (id: number): Promise<any> | string;
    }

    /**
     * type for S3's host object property 
     */
    interface HostFunction {
        (id: number): Promise<any> | string;
    }

    /**
     * type for S3's key object property 
     */
    interface KeyFunction {
        (id: number): Promise<any> | string;
    }

    /**
     * formatFileName function type
     */
    interface FormatFileNameFuncton {
        (fileOrBlobName): String;
    }

    /**
     * BlobsOptions
     */
    interface BlobsOptions {
        /**
         * The default name to be used for nameless `Blob`s
         */
        defaultName?: string;
    }


    /**
     * CameraOptions
     */
    interface CameraOptions {
        /**
         * `null` allows camera access on the default button in iOS. 
         * Otherwise provide an extra button container element to target
         */
        button?: HTMLElement;
        /**
         * Enable or disable camera access on iOS (iPod, iPhone, and iPad) devices. 
         * Note: Enabling this will disable multiple file selection
         */
        ios?: boolean;
    }

    /**
     * ConcurrentOptions
     */
    interface ConcurrentOptions {
        /**
         * Allow multiple chunks to be uploaded simultaneously per file
         */
        enabled?: boolean;
    }

    /**
     * ChunkingOptions
     */
    interface ChunkingOptions {
        /**
         * concurrent Chunking options
         */
        concurrent?: ConcurrentOptions;
        /**
         * Enable or disable splitting the file separate chunks. Each chunks is sent in a separate request
         */
        enabled?: boolean;
        /**
         * Ensure every file is uploaded in chunks, even if the file can only be split up into 1 chunk. 
         * Does not apply if chunking is not possible in the current browser
         */
        mandatory?: boolean;
        /**
         * The maximum size of each chunk, in bytes
         */
        partSize?: number;
        /**
         * ParamNamesOptions
         */
        paramNames?: ParamNamesOptions;
        /**
         * SuccessOptions
         */
        success?: SuccessOptions;

    }

    /**
     * ParamNamesOptions
     */
    interface ParamNamesOptions {
        /**
         * Name of the parameter passed with a chunked request that specifies the size in bytes of the associated chunk
         */
        chunkSize?: string;
        /**
         * Name of the parameter passed with a chunked request that specifies the starting byte of the associated chunk
         */
        partByteOffset?: string;
        /**
         * Name of the parameter passed with a chunked request that specifies the index of the associated partition
         */
        partIndex?: string;
        /**
         * Name of the parameter passed with a chunked request that specifies the total number of chunks associated with the `File` or `Blob`
         */
        totalParts?: string;
        /**
         * Sent with the first request of the resume with a value of `true`
         */
        resuming?: string;
        /**
         * totalFileSize
         */
        totalFileSize?: string;
    }

    /**
     * SuccessOptions
     */
    interface SuccessOptions {
        /**
         * Endpoint to send a POST after all chunks have been successfully uploaded for each file. 
         * Required if the `concurrent.enabled` option is set
         */
        endpoint?: string;
    }
    /**
     * CorsOptions
     */
    interface CorsOptions {
        /**
         * Enable or disable cross-origin requests from IE9 and older where XDomainRequest must be used
         */
        allowXdr?: boolean;
        /**
         * Enable or disable cross-domain requests
         */
        expected?: boolean;
        /**
         * Enable or disable sending credentials along with each cross-domain request. Ignored if allowXdr is true and IE9 is being used
         */
        sendCredentials?: boolean;
    }

    /**
     * DeleteFileOptions
     */
    interface DeleteFileOptions {
        /**
         * Any additional headers to attach to all delete file requests
         */
        customHeaders?: any;
        /**
         * Enable or disable deletion of uploaded files
         */
        enabled?: boolean;
        /**
         * The endpoint to which delete file requests are sent.
         */
        endpoint?: string;
        /**
         * Set the method to use for delete requests. 
         * Accepts 'POST' or 'DELETE'
         */
        method?: string;
        /**
         * Any additional parameters to attach to delete file requests
         */
        params?: any;
    }

    /**
     * ExtraButtonsOptions
     */
    interface ExtraButtonsOptions {
        /**
         * The container element for the upload button
         */
        element: HTMLElement;
        /**
         * This value will be used when creating the `title` attribute for the underlying `<input type="file">`. 
         * If not provided, the `text.fileInputTitle` option will be used instead
         */
        fileInputTitle?: string;
        /**
         * `true` to allow folders to be selected, `false` to allow files to be selected. See the browser support page for details regarding the limited user agent support for this feature
         */
        folders?: boolean;
        /**
         * Specify to override the default `multiple` value
         */
        multiple?: boolean;
        /**
         * Specify to override the default `validation` option specified. 
         * Any `validation` properties not specified will be inherited from the default `validation` option
         */
        validation?: any;
    }

    /**
     * FormOptions
     */
    interface FormOptions {
        /**
         * This can be the ID of the <form> or a reference to the <form> element
         * @default `'qq-form'`
         */
        element: string | HTMLElement;
        /**
         * If Fine Uploader is able to attach to a form, this value takes the place of the base `autoUpload` option
         * @default `false`
         */
        autoUpload: boolean;
        /**
         * Set this to `false` if you do not want Fine Uploader to intercept attempts to submit your form. 
         * By default, Fine Uploader will intercept submit attempts and instead upload all submitted files, including data from your form in each upload request
         * @default `true`
         */
        interceptSubmit: boolean;
    }

    /**
     * Messages
     */
    interface Messages {
        /**
         * Text passed to the error event handler if a submitted item is zero bits
         * @default `'{file} is empty, please select files again without it.'`
         */
        emptyError?: string;
        /**
         * Text passed to the error event handler if an image is too tall
         * @default `'Image is too tall.'`
         */
        maxHeightImageError?: string;
        /**
         * Text passed to the error event handler if an image is too wide
         * @default `'Image is too wide.'`
         */
        maxWidthImageError?: string;
        /**
         * Text passed to the error event handler if an image is not tall enough
         * @default `'Image is not tall enough.'`
         */
        minHeightImageError?: string;
        /**
         * Text passed to the error event handler if an image is not wide enough
         * @default `'Image is not wide enough.'`
         */
        minWidthImageError?: string;
        /**
         * Text passed to the error event handler if the item is too small
         * @default `'{file} is too small, minimum file size is {minSizeLimit}.'`
         */
        minSizeError?: string;
        /**
         * Text passed to the error event handler if any empty array of items is submitted
         * @default `'No files to upload.'`
         */
        noFilesError?: string;
        /**
         * Text displayed to the user when they attempt to leave the page while uploads are still in progress
         * @default `'The files are being uploaded, if you leave now the upload will be canceled.'`
         */
        onLeave?: string;
        /**
         * Text passed to the error event handler if a retry attempt is declared a failed due to a violation of the `validation.itemLimit` rule
         * @default `'Retry failed - you have reached your file limit.'`
         */
        retryFailTooManyItemsError?: string;
        /**
         * Text passed to the error event handler if a submitted item is too large.
         * @default `'{file} is too large, maximum file size is {sizeLimit}.'`
         */
        sizeError?: string;
        /**
         * Text passed to the error event handler if a submit is ignored due to a violation of the `validation.itemLimit` rules
         * @default `'Too many items ({netItems}) would be uploaded. Item limit is {itemLimit}.'`
         */
        tooManyItemsError?: string;
        /**
         * Text passed to the error event handler if an invalid file type is detected
         * @default `'{file} has an invalid extension. Valid extension(s): {extensions}.'`
         */
        typeError?: string;
        /**
         * Message displayed if the browser is iOS8 Safari and the corresponding workarounds option is not disabled
         * @default `'Unrecoverable error - this browser does not permit file uploading of any kind due to serious bugs in iOS8 Safari. Please use iOS8 Chrome until Apple fixes these issues.'`
         */
        unsupportedBrowserIos8Safari?: string;
    }

    /**
     * PasteOptions
     */
    interface PasteOptions {
        /**
         * The default name given to pasted images
         * @default `'pasted_image'`
         */
        defaultName?: string;
        /**
         * Enable this feature by providing any HTMLElement here
         * @default `null`
         */
        targetElement?: HTMLElement;
    }

    /**
     * ResumeOptions
     */
    interface ResumeOptions {
        /**
         * The number of days before a persistent resume record will expire
         * @default `7`
         */
        recordsExpireIn?: number;
        /**
         * Enable or disable the ability to resume failed or stopped chunked uploads
         * @default `false`
         */
        enabled?: boolean;
        /**
         * paramNames.resuming - Sent with the first request of the resume with a value of `true`.
         * @default `'qqresume'`
         */
        paramNames?: ParamNamesOptions;
    }

    /**
     * RetryOptions
     */
    interface RetryOptions {
        /**
         * The number of seconds to wait between auto retry attempts
         * @default `5`
         */
        autoAttemptDelay?: number;
        /**
         * Enable or disable retrying uploads that receive any error response
         * @default `false`
         */
        enableAuto?: boolean;
        /**
         * The maximum number of times to attempt to retry a failed upload
         * @default `3`
         */
        maxAutoAttempts?: number;
        /**
         * This property will be looked for in the server response and, if found and `true`, will indicate that no more retries should be attempted for this item
         * @default `'preventRetry'`
         */
        preventRetryResponseProperty?: string;
    }

    /**
     * RequestOptions
     */
    interface RequestOptions {
        /**
         * Additional headers sent along with each upload request
         */
        customHeaders?: any;
        /**
         * The endpoint to send upload requests to
         * @default `'/server/upload'`
         */
        endpoint?: string;
        /**
         * The name of the parameter passed if the original filename has been edited or a `Blob` is being sent
         * @default `'qqfilename'`
         */
        filenameParam?: string;
        /**
         * Force all uploads to use multipart encoding
         * @default `true`
         */
        forceMultipart?: boolean;
        /**
         * The attribute of the input element which will contain the file name.
         * For non-multipart-encoded upload requests, this will be included as a parameter in the query string of the URI with a value equal to the file name
         * @default `'qqfile'`
         */
        inputName?: string;
        /**
         * Specify a method to use when sending files to a traditional endpoint. This option is ignored in older browsers (such as IE 9 and older)
         * @default `'POST'`
         */
        method?: string;
        /**
         * The parameters that shall be sent with each upload request
         */
        params?: any;
        /**
         * Enable or disable sending parameters in the request body. 
         * If `false`, parameters are sent in the URL. 
         * Otherwise, parameters are sent in the request body
         * @default `true`
         */
        paramsInBody?: boolean;
        /**
         * The name of the parameter the uniquely identifies each associated item. The value is a Level 4 UUID
         * @default `'qquuid'`
         */
        uuidName?: string;
        /**
         * The name of the parameter passed that specifies the total file size in bytes
         * @default `'qqtotalfilesize'`
         */
        totalFileSizeName?: string;
    }

    /**
     * SizeOptions
     */
    interface SizeOptions {
        /**
         * name property will be appended to the file name of the scaled file
         */
        name: string;
        /**
         * maximum size
         */
        maxSize: number;
        /**
         * MIME type
         */
        type?: string;
    }

    /**
     * ScalingOptions
     */
    interface ScalingOptions {
        /**
         * Ignored if the current browser does not support image previews. 
         * If you want to use an alternate scaling library, you must contribute a function for this option that returns a Promise. 
         * Once the resize is complete, your promise must be fulfilled. You may, of course, reject your returned Promise is the resize fails in some way
         * @default `undefined`
         */
        customResizer?: CustomResizerCallBack;
        /**
         * A value between 1 and 100 that describes the requested quality of scaled images. Ignored unless the scaled image type target is image/jpeg
         * @default `80`
         */
        defaultQuality?: number
        /**
         * Scaled images will assume this image type if you don't specify a specific type in your size object, or if the type specified in the size object is not valid. 
         * You generally should not use any value other than image/jpeg or image/png here. 
         * The default value of null will ensure the scaled image type is PNG, unless the original file is a JPEG, in which case the scaled file will also be a JPEG. 
         * The default is probably the safest option
         * @default `null`
         */
        defaultType?: string;
        /**
         * Text sent to your `complete` event handler as an `error` property of the `response` param if a scaled image could not be generated
         * @default `'failed to scale'`
         */
        failureText?: string;
        /**
         * Ensure the EXIF data from the reference image is inserted into the scaled image. Only applicable when both the reference and the target are type image/jpeg
         * @default `false`
         */
        includeExif?: boolean;
        /**
         * Set this to `false` if you do not want scaled images to be re-oriented based on parsed EXIF data before they are uploaded
         * @default `true`
         */
        orient?: boolean;
        /**
         * Set this to `false` if you don't want to original file to be uploaded as well
         * @default `true`
         */
        sendOriginal?: boolean;
        /**
         * An array containing size objects that describe scaled versions of each submitted image that should be generated and uploaded
         */
        sizes?: SizeOptions;
    }




    interface CoreOptions {
        /**
         * Set to false if you want to be able to upload queued items later by calling the `uploadStoredFiles()` method
         */
        autoUpload?: boolean;
        /**
         * Specify an element to use as the 'select files' button. Cannot be a `<button>`
         */
        button?: HTMLElement;
        /**
         * This will result in log messages being written to the `window.console` object
         */
        debug?: boolean;
        /**
         * When true the cancel link does not appear next to files when the form uploader is used
         */
        disableCancelForFormUploads?: boolean;
        /**
         * Provide a function to control the display of file names. 
         * The raw file name is passed into the function when it is invoked. Your function may return a modified file name. 
         * Note that this does not affect the actual file name, only the displayed file name
         */
        formatFileName?: FormatFileNameFuncton;
        /**
         * Maximum allowable concurrent requests
         */
        maxConnections?: number;
        /**
         * When false this will prevent the user from simultaneously selecting or dropping more than one item
         */
        multiple?: boolean;

        /**
         * blobs options
         */
        blobs?: BlobsOptions;
        /**
         * camera options 
         */
        camera?: CameraOptions;
        /**
         * ChunkingOptions
         */
        chunking?: ChunkingOptions;
        /**
         * CorsOptions
         */
        cors?: CorsOptions;
        /**
         * DeleteFileOptions
         */
        deleteFile?: DeleteFileOptions;
        /**
         * ExtraButtonsOptions
         */
        extraButtons?: ExtraButtonsOptions;
        /**
         * FormOptions
         */
        form?: FormOptions;
        /**
         * Messages
         */
        messages?: Messages;
        /**
         * PasteOptions
         */
        paste?: PasteOptions;
        /**
         * ResumeOptions
         */
        resume?: ResumeOptions;
        /**
         * RequestOptions
         */
        request?: RequestOptions;
        /**
         * ScalingOptions
         */
        scaling?: ScalingOptions;

    }



    /**
     * Contains all the traditional Core and UI methods, events and options
     */
    interface Core {

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
        getButton(id: number): HTMLElement;

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
        getResumableFilesData(): ResumableFileObject[] | ResumableFileObject;

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

    }

    /**
     * Contains all Core, S3 and Azure methods, events and options
     */
    interface qq extends Core {
        s3: S3;
        azure: Azure;
    }

    interface S3Options{
        //Core
        /**
         * Temporary public AWS key         
         */
        accessKey: string;
        /**
         * Expiration date for temporary credentials. May be an ISO 8601 String or a `Date` object.
         */
        expiration: string | Date;
        /**
         * Temporary secret AWS key
         */
        secretKey: string;
        /**
         * Session token associated with the temporary credentials
         */
        sessionToken: string;

        //Chunking
        /**
         * The maximum size of each part, in bytes
         */
        partSize: number;

        //CORS
        /**
         * Enables or disables cross-domain ajax calls (if the `expected` property is true) in IE9 and older.
         */
        allowXdr: boolean;

        //iframeSupport
        /**
         * This is required if you plan on supporting browsers that do not implement the File API, such as IE9 and older. 
         * This must point to a blank page on the same origin/domain as the page hosting Fine Uploader
         */
        localBlankPagePath: string;

        //objectProperties
        /**
         * This value corresponds to a canned ACL
         */
        acl: string;
        /**
         * Describes the name of the bucket used to house the file in S3. 
         * This is required if the bucket cannot be determined by examining the endpoint (such as if you are using a CDN as an endpoint). 
         * Possible values are a string representing the bucket name, or a function. 
         * If the value is a function, Fine Uploader S3 will pass the associated file ID as a parameter when invoking your function. 
         * If the value is a function it may return a `promise` or a `String`
         */
        bucket: string | BucketFunction;
        /**
         * The hostname of your S3 bucket. 
         * This is required if you are using version 4 signatures and sending files through a CDN. 
         * Possible values are a string representing the host name, or a function. 
         * If the value is a function, Fine Uploader S3 will pass the associated file ID as a parameter when invoking your function. 
         * If the value is a function it may return a `promise` or a `String`.
         */
        host: string | HostFunction;
        /**
         * Describes the object key used to identify the file in your S3 bucket. 
         * Possible values are 'uuid', 'filename' or a function. 
         * If the value is a function, Fine Uploader S3 will pass the associated file ID as a parameter when invoking your function. 
         * If the value is a function it may return one of a `promise` or a `String`.
         */
        key: string | KeyFunction;
        /**
         * Set this to true if you would like to use the reduced redundancy storage class for all objects uploaded to S3
         */
        reducedRedundancy: boolean;
        /**
         * Version 4 signatures only: The S3 region identifier for the target bucket
         */
        region: string;
        /**
         * Set this to true if you would like all uploaded files to be encrypted by AWS
         */
        serverSideEncryption: boolean;
    }

    /**
     * Contains S3 methods and events
     */
    interface S3 extends Core {
        /* ===================================== S3 METHODS ============================================== */

        /**
         * Retrieve the S3 bucket name associated with the passed file (id). Note that the bucket name is not available before the file has started uploading
         * @param number fileId : An ID corresponding to a file
         * @returns string : The S3 bucket name associated with the passed file (id)
         */
        getBucket(fileId: number): string;

        /**
         * Retrieve the S3 object key associated with the passed file (id). Note that the key is not available before the file has started uploading.
         * @param number fileId : An ID corresponding to a file
         * @returns string : The S3 object key associated with the passed file (id)
         */
        getKey(fileId: number): string;

        /**
         * Returns an array of potentially resumable items
         * @returns S3ResumableFileObject : An array of Resumable file items
         */
        getResumableFilesData(): S3ResumableFileObject[] | S3ResumableFileObject;

        /**
         * Set/update the ACL to be used for one or all file uploads. If the ID is omitted, the new ACL targets all future files that have not yet been uploaded
         * @param any newAcl : Canned ACL value to be sent with the upload request. Used by S3
         * @param number id : File ID to target the ACL
         */
        setAcl(newAcl: any, id?: number): void;

        /**
         * Pass new or initial credentials. This is used to support the no-server workflow
         * @param any newCredentials : The new or initial credentials to set for server-less uploads
         */
        setCredentials(newCredentials: any): void;

        /**
         * Modify the endpoint URL where upload requests should be directed. 
         * The endpoint for a specific file or blob can be changed by passing in an optional `id` parameter. 
         * An `id` will always be a number and refers to a single file. 
         * All valid bucket URLs documented by Amazon are supported, including custom domains.
         * SSL is also supported. If you specify a CDN endpoint URL, be sure that you are specifying a bucket as well via the `objectProperties.bucket` option.
         * @param string endpoint : A URL for the S3 bucket or a CDN that forwards the request on to S3
         * @param number id : An ID corresponding to a file
         */
        setEndpoint(endpoint: string, id?: number): void;

        /**
         * Modify the endpoint that Fine Uploader should POST to when a file has been successfully uploaded to S3
         * @param string endpoint : An endpoint that Fine Uploader should POST to when a file has been successfully uploaded to S3
         * @param number id : An ID corresponding to a file
         */
        setUploadSuccessEndpoint(endpoint: string, id?: number): void;

        /**
         * Set additional parameters for the upload success request. Note that Fine Uploader will still send the bucket name, key, filename, UUID, and etag (if available) as well
         * @param object newParams : The additional parameters set for the upload request
         * @param number id : A file id to apply these upload success parameters to
         */
        setUploadSuccessParams(newParams: any, id?: number): void;


        /* ===================================== END - S3 METHODS ============================================== */
    }

    /**
     * Contains all the Azure methods and events
     */
    interface Azure extends Core {
        /* ===================================== AZURE METHODS ============================================== */

        /**
         * Retrieve the blob name with the associated ID
         * @param number : An ID corresponding to a file
         * @returns string : The blob name associated with the file ID
         */
        getBlobName(fileId: number): string;

        /**
         * Returns an array of potentially resumable items
         * @returns AzureResumableFileObject : An array of resumable items
         */
        getResumableFilesData(): AzureResumableFileObject[] | AzureResumableFileObject;

        /**
         * Modify the container URL where upload requests should be directed. 
         * The endpoint for a specific file or blob can be changed by passing in an optional `id` parameter. 
         * An `id` will always be `a number and refers to a single file
         * @param string containerUrl : The new Azure Blob Storage container URL
         * @param number id : An ID corresponding to a file
         */
        setEndpoint(containerUrl: string, id?: number): void;

        /**
         * Modify the endpoint that Fine Uploader should POST to when a file has been successfully uploaded to Azure Blob Storage.
         * @param string endpoint : An endpoint that Fine Uploader should POST to when a file has been successfully uploaded to Azure Blob Storage
         * @param number id : An ID corresponding to a file
         */
        setUploadSuccessEndpoint(endpoint: string, id?: number): void;

        /**
         * Set additional parameters for the upload success request. Note that Fine Uploader will still send the container URL, blob name, filename, and UUID as well
         * @param object newParams : The additional parameters set for the upload request
         * @param number id : A file id to apply these upload success parameters to
         */
        setUploadSuccessParams(newParams: any, id?: number): void;


        /* ===================================== END - AZURE METHODS ============================================== */
    }

}

declare var qq: FineUploader.qq;