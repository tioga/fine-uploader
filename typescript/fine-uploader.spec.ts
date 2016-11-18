/**
 * Prepare/set options for the core FineUploader
 */
let uiOptions: FineUploader.UIOptions = {
    debug: false,
    autoUpload: false,
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: "qq-template-manual-trigger",
    request: {
        endpoint: "/server/upload"
    }
};

/**
 * Instantiate the FineUploader and pass in the uiOptions
 */
let uploader: FineUploader.qq = new qq.FineUploader(uiOptions);

/**
 * Manually upload files to the server. This method should be called on some button click event
 */
uploader.uploadStoredFiles();

//utility functions
let myDiv: HTMLElement, qqMyDiv: FineUploader.qq;
myDiv = document.getElementById("myDiv");
qqMyDiv = qq(myDiv);

// Now we can call other qq methods:
qqMyDiv.hide();
let children: HTMLElement[] = qqMyDiv.children(myDiv);