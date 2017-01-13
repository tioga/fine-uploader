/**
 * Prepare/set options for the core + UI FineUploader
 */
let uiOptions: FineUploader.UIOptions = {
    debug: false,
    autoUpload: false,
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: "qq-template-manual-trigger",
    request: {
        endpoint: "/server/upload"
    },
    deleteFile: {
        enabled: true,
        endpoint: '/uploads'
    },
    retry: {
        enableAuto: true
    }
};

/**
 * Instantiate the FineUploader and pass in the uiOptions
 */
let uploader: FineUploader.qq = new qq.FineUploader(uiOptions);

/**
 * Prepare/set options for the Amazon S3 FineUploader
 */
let s3UIOptions: FineUploader.S3UIOptions = {
    debug: true,
    element: document.getElementById('fine-uploader'),
    request: {
        endpoint: '{ YOUR_BUCKET_NAME }.s3.amazonaws.com',
        accessKey: '{ YOUR_ACCESS_KEY }'
    },
    signature: {
        endpoint: '/s3/signature'
    },
    uploadSuccess: {
        endpoint: '/s3/success'
    },
    iframeSupport: {
        localBlankPagePath: '/success.html'
    },
    retry: {
        enableAuto: true // defaults to false
    },
    deleteFile: {
        enabled: true,
        endpoint: '/s3handler'
    }
}
let s3Uploader: FineUploader.qq = new qq.s3.FineUploader(s3UIOptions);

/**
 * Prepare/set options for the Amazon S3 FineUploader
 */
let azureUIOptions: FineUploader.AzureUIOptions = {
    element: document.getElementById('fine-uploader'),
    request: {
        endpoint: 'https://{ YOUR_STORAGE_ACCOUNT_NAME }.blob.core.windows.net/{ YOUR_CONTAINER_NAME }'
    },
    signature: {
        endpoint: '/signature'
    },
    uploadSuccess: {
        endpoint: '/success'
    },
    retry: {
        enableAuto: true
    },
    deleteFile: {
        enabled: true
    }
}
let azureUploader: FineUploader.qq = new qq.s3.FineUploader(azureUIOptions);

/**
 * Manually upload files to the server. This method should be called on some button click event
 */
uploader.uploadStoredFiles();
s3Uploader.uploadStoredFiles();
azureUploader.uploadStoredFiles();



//utility functions
let myDiv: HTMLElement, qqMyDiv: FineUploader.qq;
myDiv = document.getElementById("myDiv");
qqMyDiv = qq(myDiv);

// Now we can call other qq methods:
qqMyDiv.hide();
let children: HTMLElement[] = qqMyDiv.children(myDiv);