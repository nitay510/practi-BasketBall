import AWS from 'aws-sdk';

const bucketName = process.env.REACT_APP_AWS_BUCKET;
const region = process.env.REACT_APP_AWS_REGION;
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY

AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey
});

export const getUploadManager = async (albumName, image) => {
    const albumPhotosKey = encodeURIComponent(albumName) + "/";
    const photoKey = albumPhotosKey + new Date().toLocaleString().split(' ').join('') + '.png';
    // const photoKey = albumPhotosKey + 'example'
    const res = await fetch(image)
    const imgToUpload = await res.blob()
    const uploadMngr = new AWS.S3.ManagedUpload({
        params: {
            Bucket: bucketName,
            Key: photoKey,
            Body: imgToUpload,
            ContentType: 'image/png'
        }
    });

    return uploadMngr
}


// export async function genereateUploadURL() {
//     const imgName = 'Something'
//     const params = {
//         Bucket: bucketName,
//         Key: imgName,
//         Expires: 60
//     }
//     console.log('whachu talking about', s3.getSignedUrlPromise);
//     const uploadURL = await s3.getSignedUrlPromise('putObject', params)
//     console.log('uploadURL', uploadURL);
//     return uploadURL
// }


// const myBucket = new AWS.S3({
//     params: { Bucket: S3_BUCKET },
//     region: REGION,
// })

    // const uploadImage = async () => {

    //     // const image = getImgFromCanvas()
    //     console.log('image', image);
    //     if (!image) return
    //     const S3ImageUrl = await addPhoto('images', image);
    //     console.log('S3ImageUrl', S3ImageUrl);


    //     // const formData = new FormData();
    //     // formData.append('file', image)
    //     // console.log('image', image, config);
    //     // const data = await S3FileUpload.uploadFile(formData, config)
    //     // console.log('data', data);

    //     // const url = await genereateUploadURL()
    //     // console.log('login url', url);
    //     // console.log('formData', formData.get('file'));
    //     // await fetch(url, {
    //     //     method: "PUT",
    //     //     headers: {
    //     //         "content-type": "multipart/form-data"
    //     //     },
    //     //     body: formData
    //     // })
    //     // console.log('imageUrl', url.split('?')[0])
    //     // this.uploadFile();
    //     // this.props.history.push({
    //     //     pathname: `/thankYouForComing`
    //     // })
    // }
