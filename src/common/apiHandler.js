
export default function FetchAPI(uri,data,type,callback)
{
    console.log("Hmm");
    return Fetch(uri,data,type,callback);
}

const Fetch = async (uri,data,type,callback) => {
    const PostResponse = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const GetResponse = 
    {
        method: 'GET'
    }
    let requestOptions;
    switch(type)
    {
        case 'Get':
            requestOptions = GetResponse;
            break;
        case 'Post':
            requestOptions = PostResponse;
            break;
    }
    console.log('enterting common function in');
    try {
        const response = await fetch(uri, requestOptions);
        const jsonData = await response.json();
        console.log(jsonData);
        callback(true,jsonData);
    } catch (error) {
        console.log('Error fetching data:', error);
        callback(false,"");
    }
};