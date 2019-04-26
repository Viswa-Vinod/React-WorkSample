import { firestore } from "../firebase/";

export async function updateVideoStats(videoData) {
    try {
        const { selectedVideo } = videoData;
        if (!selectedVideo)
            return null;
        const dbRef = firestore.useApp().useDb();
        // getting stats for the video
        const videoObj =
            (await dbRef.getOne('videoStats', selectedVideo)) || {};
        // update the stats for the selected video
        _updateStats(videoObj, videoData);
        if (!videoObj || videoObj.error)
            return null;
        // save the stats in Firestore
        return dbRef.setOne('videoStats', selectedVideo, videoObj);
    } catch (error) {
        console.log('An error occurred while updating video stats');
        console.log('error is: ', error);
    }
}

function _updateStats(videoObj, { duration, currentTime, platform }) {
    // increment the count for each platform
    _incrementPlatformPlayCount(videoObj, platform);
    // increment the play count
    _incrementPlayCount(videoObj);
    // increment the percentage played
    _incrementPercentagePlayed(videoObj, duration, currentTime)
}

function _incrementPercentagePlayed(videoObj, duration, currentTime) {
    const percentagePlayed = (Number(currentTime) * 100) / Number(duration);
    if (isNaN(percentagePlayed))
        return null;

    if (percentagePlayed <= 10)
        videoObj['0-10'] = videoObj['0-10'] ? (videoObj['0-10'] += 1) : 1;

    if (percentagePlayed > 10 && percentagePlayed <= 30)
        videoObj['10-30'] = videoObj['10-30'] ? (videoObj['10-30'] += 1) : 1;

    if (percentagePlayed > 70 && percentagePlayed <= 95)
        videoObj['70-100'] = videoObj['70-100'] ? (videoObj['70-100'] += 1) : 1;

    if (percentagePlayed > 95)
        videoObj.Completed = videoObj.Completed ? (videoObj.Completed += 1) : 1;
}

function _incrementPlatformPlayCount(videoObj, platform) {
    switch (platform) {
        case 'Android':
            videoObj.Android =
                videoObj.Android ? (videoObj.Android += 1) : 1;
            break;
        case 'iOS':
            videoObj.iOS =
                videoObj.iOS ? (videoObj.iOS += 1) : 1;
            break;
        default:
            videoObj.Others =
                videoObj.Others ? (videoObj.Others += 1) : 1;
    }
}

function _incrementPlayCount(videoObj) {
    videoObj.PlayCount = videoObj.PlayCount ? (videoObj.PlayCount += 1) : 1;
}

