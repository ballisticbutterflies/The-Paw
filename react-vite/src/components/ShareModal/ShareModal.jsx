
import "./ShareModal.css";
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, EmailShareButton, EmailIcon } from "react-share";

function ShareModal() {
    const url = location.href;
    // const [copySuccess, setCopySuccess] = useState("");
    // const textAreaRef = useRef(null);

    const copyUrl = async () => {
        await navigator.clipboard.writeText(url);
        // setCopySuccess("Copied!");
    }

    return (
        <div className="shareModal">
            <h1>Share business</h1>
            <div className="shareOptions">
                <div className="shareIcons">
                    <FacebookShareButton
                        url={url}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    <TwitterShareButton
                        url={url}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>

                    <EmailShareButton
                        url={url}
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>

                </div>
                <div className="copyUrl">
                    <input type="text" value={url} readOnly />
                    <a onClick={copyUrl}><i className="fa-regular fa-copy" /> Copy link</a>
                </div>
            </div>
        </div>
    )
}

export default ShareModal;
