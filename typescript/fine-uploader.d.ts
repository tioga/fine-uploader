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
         * @default `true`
         */
        orient?: boolean;
        /**
         * defaults to the type of the reference image
         */
        type?: string;
        /**
         * number between `0` and `100` 
         * @default `80`
         */
        quality?: number;
        /**
         * @default `false`
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
         * @default `Misc data`
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
         * @default `null`
         */
        button?: HTMLElement;
        /**
         * Enable or disable camera access on iOS (iPod, iPhone, and iPad) devices. 
         * Note: Enabling this will disable multiple file selection
         * @default `false`
         */
        ios?: boolean;
    }

    /**
     * ConcurrentOptions
     */
    interface ConcurrentOptions {
        /**
         * Allow multiple chunks to be uploaded simultaneously per file
         * @default `false`
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
         * @default `false`
         */
        enabled?: boolean;
        /**
         * Ensure every file is uploaded in chunks, even if the file can only be split up into 1 chunk. 
         * Does not apply if chunking is not possible in the current browser
         * @default `false`
         */
        mandatory?: boolean;
        /**
         * The maximum size of each chunk, in bytes
         * @default `2000000`
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
         * @default `'qqchunksize'`
         */
        chunkSize?: string;
        /**
         * Name of the parameter passed with a chunked request that specifies the starting byte of the associated chunk
         * @default `'qqpartbyteoffset'`
         */
        partByteOffset?: string;
        /**
         * Name of the parameter passed with a chunked request that specifies the index of the associated partition
         * @default `'qqpartindex'`
         */
        partIndex?: string;
        /**
         * Name of the parameter passed with a chunked request that specifies the total number of chunks associated with the `File` or `Blob`
         * @default `'qqtotalparts'`
         */
        totalParts?: string;
        /**
         * Sent with the first request of the resume with a value of `true`
         * @default `'qqresume'`
         */
        resuming?: string;
        /**
         * totalFileSize
         * @default `'qqtotalfilesize'`
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
         * @default `null`
         */
        endpoint?: string;
    }
    /**
     * CorsOptions
     */
    interface CorsOptions {
        /**
         * Enable or disable cross-origin requests from IE9 and older where XDomainRequest must be used
         * @default `false`
         */
        allowXdr?: boolean;
        /**
         * Enable or disable cross-domain requests
         * @default `false`
         */
        expected?: boolean;
        /**
         * Enable or disable sending credentials along with each cross-domain request. Ignored if allowXdr is true and IE9 is being used
         * @default `false`
         */
        sendCredentials?: boolean;
    }

    /**
     * DeleteFileOptions
     */
    interface DeleteFileOptions {
        /**
         * Any additional headers to attach to all delete file requests
         * @default `{}`
         */
        customHeaders?: any;
        /**
         * Enable or disable deletion of uploaded files
         * @default `false`
         */
        enabled?: boolean;
        /**
         * The endpoint to which delete file requests are sent.
         * @default `'/server/upload'`
         */
        endpoint?: string;
        /**
         * Set the method to use for delete requests. 
         * Accepts 'POST' or 'DELETE'
         * @default `'DELETE'`
         */
        method?: string;
        /**
         * Any additional parameters to attach to delete file requests
         * @default `{}`
         */
        params?: any;
    }

    /**
     * ExtraButtonsOptions
     */
    interface ExtraButtonsOptions {
        /**
         * The container element for the upload button
         * @default `undefined`
         */
        element: HTMLElement;
        /**
         * This value will be used when creating the `title` attribute for the underlying `<input type="file">`. 
         * If not provided, the `text.fileInputTitle` option will be used instead
         * @default `'file input'`
         */
        fileInputTitle?: string;
        /**
         * `true` to allow folders to be selected, `false` to allow files to be selected. See the browser support page for details regarding the limited user agent support for this feature
         * @default `false`
         */
        folders?: boolean;
        /**
         * Specify to override the default `multiple` value
         * @default `true`
         */
        multiple?: boolean;
        /**
         * Specify to override the default `validation` option specified. 
         * Any `validation` properties not specified will be inherited from the default `validation` option
         * @default `validation`
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
         * @default `[]`
         */
        sizes?: SizeOptions;
    }

    /**
     * SessionOptions
     */
    interface SessionOptions {
        /**
         * Any additional headers you would like included with the GET request sent to your server. Ignored in IE9 and IE8 if the endpoint is cross-origin
         * @default `{}`
         */
        customHeaders?: any;
        /**
         * If non-null, Fine Uploader will send a GET request on startup to this endpoint, expecting a JSON response containing data about the initial file list to populate
         * @default `null`
         */
        endpoint?: string;
        /**
         * Any parameters you would like passed with the associated GET request to your server
         * @default `{}`
         */
        params?: any;
        /**
         * Set this to `false` if you do not want the file list to be retrieved from the server as part of a reset.
         * @default `true`
         */
        refreshOnReset?: boolean
    }

    /**
     * TextOptions
     */
    interface TextOptions {
        /**
         * In the event of non-200 response from the server sans the 'error' property, this message will be passed to the 'error' event handler
         * @default `'Upload failure reason unknown'`
         */
        defaultResponseError?: string;
        /**
         * The value for the `title` attribute attached to the `<input type="file">` maintained by Fine Uploader for each upload button. This is used as hover text, among other things
         * @default `'file input'`
         */
        fileInputTitle?: string;
        /**
         * Symbols used to represent file size, in ascending order
         * @default `['kB', 'MB', 'GB', 'TB', 'PB', 'EB']`
         */
        sizeSymbols?: string[];
    }

    interface ImageOptions {
        /**
         * Restrict images to a maximum height in pixels (wherever possible)
         * @default `0`
         */
        maxHeight?: number;
        /**
         * Restrict images to a maximum width in pixels (wherever possible)
         * @default `0`
         */
        maxWidth?: number;
        /**
         * Restrict images to a minimum height in pixels (wherever possible)
         * @default `0`
         */
        minHeight?: number;
        /**
         * Restrict images to a minimum width in pixels (wherever possible)
         * @default `0`
         */
        minWidth?: number;
    }

    interface ValidationOptions {
        /**
         * Used by the file selection dialog. Restrict the valid file types that appear in the selection dialog by listing valid content-type specifiers
         * @default `null`
         */
        acceptFiles?: any;
        /**
         * Specify file valid file extensions here to restrict uploads to specific types
         * @default `[]`
         */
        allowedExtensions?: string[];
        /**
         * Maximum number of items that can be potentially uploaded in this session. Will reject all items that are added or retried after this limit is reached
         * @default `0`
         */
        itemLimit?: number;
        /**
         * The minimum allowable size, in bytes, for an item
         * @default `0`
         */
        minSizeLimit: number;
        /**
         * The maximum allowable size, in bytes, for an item
         * @default `0` 
         */
        sizeLimit?: number;
        /**
         * When `true` the first invalid item will stop processing further files
         * @default `true`
         */
        stopOnFirstInvalidFile?: boolean;
        /**
         * ImageOptions
         */
        image?: ImageOptions;
    }

    interface WorkArounds {
        /**
         * Ensures all `<input type='file'>` elements tracked by Fine Uploader do NOT contain a `multiple` attribute to work around an issue present in iOS7 & 8 that otherwise results in 0-sized uploaded videos
         * @default `true`
         */
        iosEmptyVideos?: boolean;
        /**
         * Ensures all `<input type='file'>` elements tracked by Fine Uploader always have a `multiple` attribute present. 
         * This only applies to iOS8 Chrome and iOS8 UIWebView, and is put in place to work around an issue that causes the browser to crash when a file input element does not contain a `multiple` attribute inside of a `UIWebView` container created by an iOS8 app compiled with and iOS7 SDK
         * @default `false`
         */
        ios8BrowserCrash?: boolean;
        /**
         * Disables Fine Uploader and displays a message to the user in iOS 8.0.0 Safari. 
         * Due to serious bugs in iOS 8.0.0 Safari, uploading is not possible. 
         * This was apparently fixed in subsequent builds of iOS8, so this workaround only targets 8.0.0
         * @default `true`
         */
        ios8SafariUploads?: boolean;
    }


    /**
     * Contains Core options 
     */
    interface CoreOptions {
        /**
         * Set to false if you want to be able to upload queued items later by calling the `uploadStoredFiles()` method
         * @default `true`
         */
        autoUpload?: boolean;
        /**
         * Specify an element to use as the 'select files' button. Cannot be a `<button>`
         * @default `null`
         */
        button?: HTMLElement;
        /**
         * This will result in log messages being written to the `window.console` object
         * @default `false`
         */
        debug?: boolean;
        /**
         * When true the cancel link does not appear next to files when the form uploader is used
         * @default `false`
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
         * @default `3`
         */
        maxConnections?: number;
        /**
         * When false this will prevent the user from simultaneously selecting or dropping more than one item
         * @default `true`
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
        request: RequestOptions;
        /**
         * ScalingOptions
         */
        scaling?: ScalingOptions;
        /**
         * SessionOptions
         */
        session?: SessionOptions;
        /**
         * TextOptions
         */
        text?: TextOptions;
        /**
         * ValidationOptions
         */
        validation?: ValidationOptions;
        /**
         * WorkArounds
         */
        workarounds?: WorkArounds;

    }

    /**
     * function for showMessage option
     */
    interface ShowMessageFunction {
        (message: string): Promise<any> | void;
    }
    /**
     * function for showMessage option
     */
    interface ShowConfirmFunction {
        (message: string): Promise<any> | void;
    }
    /**
     * function for showMessage option
     */
    interface ShowPromptFunction {
        (message: string, defaultValue: string | number): Promise<any> | void;
    }

    /**
     * This interface defines UI specific options for the core DeleteFileOptions
     */
    interface UIDeleteFileOptions extends DeleteFileOptions {
        /**
         * The message displayed in the confirm delete dialog
         * @default `'Are you sure you want to delete {filename}?'`
         */
        confirmMessage?: string;
        /**
         * The status message to appear next to a file that has failed to delete
         * @default `'Delete failed'`
         */
        deletingFailedText?: string;
        /**
         * The status message to appear next to a file that is pending deletion
         * @default `'Deleting...'`
         */
        deletingStatusText?: string;
        /**
         * If this value is set to `true`, the user will be required to confirm the file delete request via a confirmation dialog
         * @default `false`
         */
        forceConfirm?: boolean;
    }

    /**
     * UIDisplayOptions
     */
    interface UIDisplayOptions {
        /**
         * Enable or disable the display of the file size next to the file after it has been submitted
         * @default `false`
         */
        fileSizeOnSubmit?: boolean;
        /**
         * When `true` batches of files are added to the top of the UI's file list. The default is to append file(s) to the bottom of the list
         * @default `false`
         */
        prependFiles?: boolean;
    }

    /**
     * dragAndDrop options
     */
    interface UIDragAndDropOptions {
        /**
         * Designate additional drop zones for file input
         * @default `[]`
         */
        extraDropzones?: any[];
        /**
         * Include the path of dropped files (starting with the top-level dropped directory). This value will be sent along with the request as a qqpath parameter
         * @default `false`
         */
        reportDirectoryPaths?: boolean;
    }

    /**
     * failedUploadTextDisplay options
     */
    interface UIFailedUploadTextDisplay {
        /**
         * Enable or disable a tooltip that will display the full contents of the error message when the mouse pointer hovers over the failed item.
         * @default `true`
         */
        enableTooltip?: boolean;
        /**
         * Set the message to display next to each failed file. 
         * One of: 'default' which displays the failedUploadText, 'custom' which displays the error response from the server, or 'none' which displays no text
         * @default `'default'`
         */
        mode?: string;
        /**
         * The property from the server response that contains the error text to display next to a failed item. Ignored unless `mode` is `'custom'`
         * @default `'error'`
         */
        responseProperty?: string;
    }

    /**
     * UIMessages
     */
    interface UIMessages extends Messages {
        /**
         * Text sent to `showMessage` when `multiple` is `false` and more than one file is dropped at once
         * @default `'You may only drop one file.'`
         */
        tooManyFilesError?: string;
        /**
         * Text displayed to users who have ancient browsers
         * @default `'Unrecoverable error - the browser does not permit uploading of any kind.'`
         */
        unsupportedBrowser?: string;
    }

    /**
     * UIRetryOptions
     */
    interface UIRetryOptions extends RetryOptions {
        /**
         * The text of the note that will optionally appear next to the item during automatic retry attempts. 
         * Ignored if `showAutoRetryNote` is false.
         * @default `'Retrying {retryNum}/{maxAuto} ...'`
         */
        autoRetryNote?: string;
        /**
         * Enable or disable the showing of a button/link next to the failed item after all retry attempts have been exhausted. 
         * Clicking the button/link will force the uploader to make another attempt
         * @default `false`
         */
        showButton?: boolean;
        /**
         * Enable or disable a status message appearing next to the item during auto retry attempts
         * @default `true`
         */
        showAutoRetryNote?: boolean;
    }

    /**
     * thumbnails options
     */
    interface UIThumbnailsOptions {
        /**
         * Ignored if the current browser does not support image previews. 
         * If you want to use an alternate library to resize the image, you must contribute a function for this option that returns a Promise. 
         * Once the resize is complete, your promise must be fulfilled. 
         * You may, of course, reject your returned Promise is the resize fails in some way
         * @default `undefined`
         */
        customResizer?: CustomResizerCallBack;
        /**
         * Maximum number of previews to render per Fine Uploader instance. 
         * A call to the reset method resets this value as well
         * @default `0`
         */
        maxCount?: number;
        /**
         * The amount of time, in milliseconds, to pause between each preview generation process. 
         * This is in place to prevent the UI thread from locking up for a continuously long period of time, as preview generation can be a resource-intensive process
         * @default `750`
         */
        timeBetweenThumbs?: number;
        /**
         * 
         */
        placeholders?: UIThumbnailsPlaceholderOptions;
    }

    /**
     * UIThumbnailsPlaceholderOptions
     */
    interface UIThumbnailsPlaceholderOptions {
        /**
         * Absolute URL or relative path to the image to display if the preview/thumbnail could not be generated/displayed
         * @default `null`
         */
        notAvailablePath?: string;
        /**
         * Absolute URL or relative path to the image to display during preview generation (modern browsers) or until the server response has been parsed (older browsers)
         * @default `null`
         */
        waitingPath?: string;
        /**
         * Set this to true if you want the 'waiting' placeholder image to remain in place until the server response has been parsed. 
         * This is useful if you expect to return thumbnail URLs in your upload responses for files types that cannot be previewed. 
         * This option is ignored in older browsers where client-side previews cannot be generated
         * @default `false`
         */
        waitUntilResponse?: boolean;
    }

    /**
     * UIPasteOptions
     */
    interface UIPasteOptions extends PasteOptions {
        /**
         * Text that will appear in the `showPrompt` dialog.
         * @default `Please name this image`
         */
        namePromptMessage?: string;
        /**
         * Enable or disable the usage of `showPrompt` by Fine Uploader to prompt the user for a filename for a pasted file
         * @default `false`
         */
        promptForName?: boolean;
    }

    /**
     * UIScalingOptions
     */
    interface UIScalingOptions extends ScalingOptions {
        /**
         * Text that will appear next to a scaled image that could not be generated. 
         * This is in addition to the behavior associated with this property provided by Fine Uploader Core
         * @default `'Failed to scale'`
         */
        failureText?: string;
        /**
         * Set this to true if you do not want any scaled images to be displayed in the file list
         * @default `false`
         */
        hideScaled?: boolean;
    }

    /**
     * UITextOptions
     */
    interface UITextOptions extends TextOptions {
        /**
         * Text that appears next to a failed item
         * @default `'Upload failed'`
         */
        failUpload?: string;
        /**
         * Appears next to a currently uploading item
         * @default `'{percent}% of {total_size}'`
         */
        formatProgress?: string;
        /**
         * Appears next to a paused item
         * @default `'paused'`
         */
        paused?: string;
        /**
         * Appears next to item once the last bytes have been sent (differs on the user-agent)
         * @default `'Processing...'`
         */
        waitingForResponse?: string;
    }


    /**
     * Contains UIOptions
     */
    interface UIOptions extends CoreOptions {
        /**
         * Container element for the default drop zone
         * @default `null`
         */
        element?: HTMLElement;
        /**
         * Container element for the item list
         * @default `null`
         */
        listElement?: HTMLElement;
        /**
         * When false this will prevent the user from simultaneously selecting or dropping more than one item. 
         * Dropping or selecting another item will clear the upload list. If another is already uploading, it will be canceled. 
         * To ignore rather than cancel, simply return false in the 'validate' or 'submit' event handlers
         * @default `true`
         */
        multiple?: boolean
        /**
         * Provide a function here to display a message to the user when the uploader receives an error or the user attempts to leave the page. 
         * The provided function may return a promise if one wishes to do asynchronous work whilst waiting for user input
         * @default `function(message) { window.alert(message); }`
         */
        showMessage?: ShowMessageFunction;
        /**
         * Provide a function here to prompt the user to confirm deletion of a file. 
         * The provided function may return a promise if one wishes to do asynchronous work whilst waiting for user input
         * @default `function(message) { window.confirm(message); }`
         */
        showConfirm?: ShowConfirmFunction;
        /**
         * Provide a function here to prompt the user for a filename when pasting file(s). 
         * The provided function may return a promise if one wishes to do asynchronous work whilst waiting for user input
         * @default `function(message, defaultValue) { window.prompt(message, defaultValue); }`
         */
        showPrompt?: ShowPromptFunction;
        /**
         * This points to the container element that contains the template to use for one or more Fine Uploader UI instances. 
         * You can either specify a string, which is the element ID (the ID of the container element on the page) or an `Element` that points to the container element
         * @default `'qq-template'`
         */
        template?: string | HTMLElement;
        /**
         * UIDeleteFileOptions
         */
        deleteFile?: UIDeleteFileOptions;
        /**
         * display options
         */
        display?: UIDisplayOptions;
        /**
         * dragAndDrop options
         */
        dragAndDrop?: UIDragAndDropOptions;
        /**
         * failedUploadTextDisplay options
         */
        failedUploadTextDisplay?: UIFailedUploadTextDisplay;
        /**
         * messages
         */
        messages?: UIMessages;
        /**
         * retry options
         */
        retry?: UIRetryOptions;
        /**
         * thumbnail options
         */
        thumbnails?: UIThumbnailsOptions;
        /**
         * paste UI options
         */
        paste?: UIPasteOptions;
        /**
         * UI scaling options
         */
        scaling?: UIScalingOptions;
        /**
         * UI text options
         */
        text?: UITextOptions;
    }


    /**
     * Contains all the traditional Core and UI methods, events and options
     */
    interface Core {

        /* ======================================= CORE METHODS ========================================== */

        /**
         * The FineUploader Core only constructor 
         */
        FineUploaderBasic(fineuploaderOptions: CoreOptions): qq;

        /**
         * The FineUploader Core + UI constructor 
         */
        FineUploader(fineuploaderOptions: UIOptions): qq;

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
     * S3CredentialsOptions
     */
    interface S3CredentialsOptions {
        /**
         * Temporary public AWS key    
         * @default `null`     
         */
        accessKey: string;
        /**
         * Expiration date for temporary credentials. May be an ISO 8601 String or a `Date` object.
         * @default `null`
         */
        expiration: string | Date;
        /**
         * Temporary secret AWS key
         * @default `null`
         */
        secretKey: string;
        /**
         * Session token associated with the temporary credentials
         * @default `null`
         */
        sessionToken: string;
    }

    /**
     * S3ChunkingOptions
     */
    interface S3ChunkingOptions extends ChunkingOptions {
        /**
         * The maximum size of each part, in bytes
         * @default `5242880`
         */
        partSize: number;
    }

    /**
     * S3CorsOptions
     */
    interface S3CorsOptions extends CorsOptions {
        /**
         * Enables or disables cross-domain ajax calls (if the `expected` property is true) in IE9 and older.
         * @default `true`
         */
        allowXdr: boolean;
    }

    /**
     * S3iFrameSupportOptions
     */
    interface S3iFrameSupportOptions {
        /**
         * This is required if you plan on supporting browsers that do not implement the File API, such as IE9 and older. 
         * This must point to a blank page on the same origin/domain as the page hosting Fine Uploader
         * @default `null`
         */
        localBlankPagePath: string;
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
     * S3ObjectPropertyOptions
     */
    interface S3ObjectPropertyOptions {
        /**
         * This value corresponds to a canned ACL
         * @default `'private'`
         */
        acl: string;
        /**
         * Describes the name of the bucket used to house the file in S3. 
         * This is required if the bucket cannot be determined by examining the endpoint (such as if you are using a CDN as an endpoint). 
         * Possible values are a string representing the bucket name, or a function. 
         * If the value is a function, Fine Uploader S3 will pass the associated file ID as a parameter when invoking your function. 
         * If the value is a function it may return a `promise` or a `String`
         * @default `(assumes the bucket can be determined by parsing the endpoint string)`
         */
        bucket: string | BucketFunction;
        /**
         * The hostname of your S3 bucket. 
         * This is required if you are using version 4 signatures and sending files through a CDN. 
         * Possible values are a string representing the host name, or a function. 
         * If the value is a function, Fine Uploader S3 will pass the associated file ID as a parameter when invoking your function. 
         * If the value is a function it may return a `promise` or a `String`.
         * @default `(uses the request endpoint to determine the hostname)`
         */
        host: string | HostFunction;
        /**
         * Describes the object key used to identify the file in your S3 bucket. 
         * Possible values are 'uuid', 'filename' or a function. 
         * If the value is a function, Fine Uploader S3 will pass the associated file ID as a parameter when invoking your function. 
         * If the value is a function it may return one of a `promise` or a `String`.
         * @default `'uuid'`
         */
        key: string | KeyFunction;
        /**
         * Set this to true if you would like to use the reduced redundancy storage class for all objects uploaded to S3
         * @default `false`
         */
        reducedRedundancy: boolean;
        /**
         * Version 4 signatures only: The S3 region identifier for the target bucket
         * @default `'us-east-1'`
         */
        region: string;
        /**
         * Set this to true if you would like all uploaded files to be encrypted by AWS
         * @default `false`
         */
        serverSideEncryption: boolean;
    }

    interface S3RequestOptions extends RequestOptions {
        /**
         * Your AWS public key. NOT YOUR SECRET KEY. Ignored if `credentials` have been set
         * @default `null`
         */
        accessKey?: string;
        /**
         * Number of milliseconds to add to the `x-amz-date` header and the policy expiration date to account for clock drift on the browser/client machine
         * @default `0`
         */
        clockDrift?: number;
        /**
         * URL for your S3 bucket or the URL of a CDN that forwards the request to S3. 
         * All valid bucket URLs documented by Amazon are supported, including custom domains. SSL is also supported. 
         * If you use a CDN address, be sure to specify the bucket via the objectProperties.bucket option
         * @default `null`
         */
        endpoint?: string;
        /**
         * Part of the parameter name that contains the name of the associated file which may differ from the key name. 
         * Prefixed with 'x-amz-meta-' by Fine Uploader
         * @default `'qqfilename'`
         */
        filenameParam?: string;
        /**
         * Parameters passed along with each upload request
         * @default `{}`
         */
        params?: any;
    }

    /**
     * type for S3's customHeaders function  
     */
    interface S3CustomHeaderFunction {
        (id: number): void;
    }

    /**
     * S3SignatureOptions
     */
    interface S3SignatureOptions {
        /**
         * Additional headers sent along with each signature request. 
         * If you declare a function as the value, the associated file's ID will be passed to your function when it is invoked
         * @default `{}`
         */
        customHeaders?: any | S3CustomHeaderFunction;
        /**
         * The endpoint that Fine Uploader can use to send policy documents (HTML form uploads) or other strings to sign (REST requests) before sending requests off to S3
         * @default `null`
         */
        endpoint?: string;
        /**
         * The AWS/S3 signature version to use. Currently supported values are `2` and `4`. Directly related to `objectProperties.region`
         * @default `2`
         */
        version?: number;
    }

    /**
     * S3UploadSuccessOptions
     */
    interface S3UploadSuccessOptions {
        /**
         * Additional headers sent along with each signature request
         * @default `{}`
         */
        customHeaders?: any;
        /**
         * An endpoint that Fine Uploader should POST to when a file has been successfully uploaded to S3
         * @default `null`
         */
        endpoint?: string;
        /**
         * The request method (i.e. POST/PUT)
         * @default `POST`
         */
        method?: string;
        /**
         * Any additional parameters to attach to upload success file requests. 
         * Note that Fine Uploader will still send the bucket, key, filename, UUID, and etag (if available) as well
         * @default `{}`
         */
        params?: any;
    }

    /**
     * Contains S3's Core options
     */
    interface S3CoreOptions extends CoreOptions {
        /**
         * credentials  
         */
        credentials?: S3CredentialsOptions;
        /**
         * chunking options
         */
        chunking?: S3ChunkingOptions;
        /**
         * cors options
         */
        cors?: S3CorsOptions;
        /**
         * iframeSupport options
         */
        iframeSupport?: S3iFrameSupportOptions;
        /**
         * objectProperties
         */
        objectProperties?: S3ObjectPropertyOptions;
        /**
         * request options
         */
        request: S3RequestOptions;
        /**
         * signature options
         */
        signature?: S3SignatureOptions;
        /**
         * upload success options
         */
        uploadSuccess?: S3UploadSuccessOptions;
    }

    /**
     * S3FailedUploadTextDisplayOptions
     */
    interface S3FailedUploadTextDisplayOptions {
        /**
         * You will most likely want to keep this at the default value of 'custom'. See the UI options documentation for more info on this option.
         * @default `'custom'`
         */
        mode?: string;
    }

    /**
     * NOT WORKING YET
     */
    interface S3UIOptions extends S3CoreOptions, UIOptions {
        /**
         * failedUploadText options
         */
        failedUploadTextDisplay?: S3FailedUploadTextDisplayOptions;
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
     * AzureChunkingOptions
     */
    interface AzureChunkingOptions extends ChunkingOptions {
        /**
         * The maximum size of each part, in bytes
         * @default `5242880`
         */
        partSize: number;
        /**
         * Files smaller than this value will not be chunked.
         * @default `4000001`
         */
        minFileSize?: number
    }

    /**
     * AzureCorsOptions
     */
    interface AzureCorsOptions extends CorsOptions {
        /**
         * Enables or disables cross-domain ajax calls (if the `expected` property is true) in IE9 and older.
         * @default `true`
         */
        allowXdr: boolean;
    }

    /**
     * AzureBlobPropertyNameFunction
     */
    interface AzureBlobPropertyNameFunction {
        (id: number) : Promise<any> | string;
    }

    /**
     * AzureBlobPropertyOptions
     */
    interface AzureBlobPropertyOptions {
        /**
         * Describes the blob name used to identify the file in your Azure Blob Storage container. 
         * Possible values are 'uuid', 'filename' or a function. If the value is a function, Fine Uploader Azure will pass the associated file ID as a parameter when invoking your function. 
         * If the value is a function it may return one of a qq.Promise or a String
         * @default `'uuid'`
         */
        name?: string | AzureBlobPropertyNameFunction;
    }

    /**
     * AzureRequestOptions
     */
    interface AzureRequestOptions extends RequestOptions {
        /**
         * URL for your Azure Blob Storage container
         * @default `null`
         */
        containerUrl?: string;
        /**
         * Parameters passed along with each upload request.
         * @default `{}`
         */
        params?: any;
        /**
         * Part of the parameter name that contains the name of the associated file which may differ from the blob name. 
         * Prefixed with 'x-ms-meta-' by Fine Uploader
         * @default `'qqfilename'`
         */
        filenameParam?: string;
    }

    /**
     * type for Azure's customHeaders function  
     */
    interface AzureCustomHeaderFunction {
        (id: number): void;
    }

    /**
     * AzureSignatureOptions
     */
    interface AzureSignatureOptions {
        /**
         * Additional headers sent along with each signature request. 
         * If you declare a function as the value, the associated file's ID will be passed to your function when it is invoked
         * @default `{}`
         */
        customHeaders?: any | AzureCustomHeaderFunction;
        /**
         * The endpoint that Fine Uploader can use to send GET for a SAS before sending requests off to Azure. 
         * The blob URL and underlying method type associated with the underlying REST request will be included in the query string
         * @default `null`
         */
        endpoint?: string;
    }

    /**
     * AzureUploadSuccessOptions
     */
    interface AzureUploadSuccessOptions {
        /**
         * Additional headers sent along with each signature request
         * @default `{}`
         */
        customHeaders?: any;
        /**
         * An endpoint that Fine Uploader should POST to when a file has been successfully uploaded to Azure Blob Storage.
         * @default `null`
         */
        endpoint?: string;
        /**
         * The request method (i.e. POST/PUT)
         * @default `POST`
         */
        method?: string;
        /**
         * Any additional parameters to attach to upload success file requests. 
         * Note that Fine Uploader will still send the bucket, key, filename, UUID, and etag (if available) as well
         * @default `{}`
         */
        params?: any;
    }

    /**
     * Azure Core Options 
     */
    interface AzureCoreOptions extends CoreOptions {
        /**
         * chunking options
         */
        chunking?: AzureChunkingOptions;
        /**
         * cors options
         */
        cors?: AzureCorsOptions;
        /**
         * blobProperties
         */
        blobProperties?: AzureBlobPropertyOptions;
        /**
         * RequestOptions
         */
        request: AzureRequestOptions;
        /**
         * AzureSignatureOptions
         */
        signature?: AzureSignatureOptions;
        /**
         * AzureUploadSuccessOptions
         */
        uploadSuccess?: AzureUploadSuccessOptions;
    }

    /**
     * AzureFailedUploadTextDisplayOptions
     */
    interface AzureFailedUploadTextDisplayOptions {
        /**
         * You will most likely want to keep this at the default value of 'custom'. See the UI options documentation for more info on this option.
         * @default `'custom'`
         */
        mode?: string;
    }

    /**
     * NOT WORKING YET
     */
    interface AzureUIOptions extends AzureCoreOptions, UIOptions {
        /**
         * failedUploadText options
         */
        failedUploadTextDisplay?: AzureFailedUploadTextDisplayOptions;
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



    /**
     * Contains all Core, S3 and Azure methods, events and options
     */
    interface qq extends Core {
        s3: S3;
        azure: Azure;
    }

}

declare var qq: FineUploader.qq;

