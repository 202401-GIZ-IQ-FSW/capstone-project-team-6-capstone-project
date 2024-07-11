import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faUserCog } from '@fortawesome/free-solid-svg-icons';


const Comments = ({ ticketId, signedIn, user, ticket }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentImage, setNewCommentImage] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentMessage, setEditCommentMessage] = useState("");
  const [editCommentImage, setEditCommentImage] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const roles = ["superAdmin", "admin"];

  useEffect(() => {
    if (signedIn) {
      fetchComments();
    }
  }, [signedIn, ticketId, user]);

  const fetchComments = async () => {

    try {
      const response = await fetch(`http://localhost:3001/tickets/${ticketId}/comments`, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setComments(data);
        setMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/tickets/${ticketId}/comments`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newComment, imageURL: newCommentImage }),
      });
      if (response.ok) {
        setNewComment("");
        setNewCommentImage("");
        fetchComments();
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleEditComment = (comment) => {
    setEditCommentId(comment._id);
    setEditCommentMessage(comment.message);
    setEditCommentImage(comment.imageURL);
  };

  const handleUpdateComment = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/tickets/${ticketId}/comments/${editCommentId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: editCommentMessage, imageURL: editCommentImage }),
      });
      if (response.ok) {
        setEditCommentId(null);
        setEditCommentMessage("");
        setEditCommentImage("");
        fetchComments();
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3001/tickets/${ticketId}/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        fetchComments();
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  function extractImageId(rawImageUrl) {
    // if (!rawImageUrl.includes("drive.google.com")) {
    //   return rawImageUrl;
    // }
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = rawImageUrl.match(regex);
    if (match && match[1]) {
      return "http://localhost:3001/image/" + match[1];
    } else {
      console.log('Invalid Google Drive URL');
    }
  }

  const userRoleDisplay = (role) => {
    switch (role) {
      case "superAdmin":
        return "Super Admin";
      case "admin":
        return "Admin";
      case "supportAgent":
        return "Support Agent";
      case "customer":
        return "Customer";
      default:
        return "";
    }
  };

  if (signedIn === null || loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="pageLoader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        {message && <div className="flex justify-center mb-2 p-2 bg-emerald-300 rounded-md">{message}</div>}
        {error && <div className="flex justify-center mb-2 p-2 rounded-md">{error}</div>}
      </div>

      {/* New Comment Form */}
      <form onSubmit={handlePostComment} className="bg-gray-200 border border-gray-600 text-sm lg:text-base rounded-lg px-4 py-3 my-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          required
        />
        <input
          value={newCommentImage}
          onChange={(e) => setNewCommentImage(e.target.value)}
          placeholder="Provide an image of the problem if any using google drive public image url only"
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <button type="submit" className="bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </form>

      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment._id} className="mb-4 bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
            
            <div className="flex justify-between mb-3 pb-1 gap-4 text-sm lg:text-base border-b-2 border-gray-400">

              {/* User Name */}
              { comment?.user && ( comment?.user?._id === user?._id || user?.role === "superAdmin" || (user?.role === "admin" && !["admin", "superAdmin"].includes(comment?.user?.role))) ? (
                <Link href={`/users/view-user/${comment?.user?._id}`} className="text-gray-600 lg:text-lg font-bold hover:text-sky-500 group">
                  {comment.user?.name || "Support"} 
                  {/* {comment.user && user?.role !== "customer" ? " | " : ""} */}
                  {comment.user && user?.role !== "customer" && (
                    <span className="text-xs lg:text-sm font-semibold">
                      <br />
                      {userRoleDisplay(comment.user?.role)}{" "}
                      {comment.user.role !== "customer" &&
                        <FontAwesomeIcon icon={faUserCog} className="text-gray-500 group-hover:text-sky-500" />}
                      {comment.user.role === "customer" &&
                        <FontAwesomeIcon icon={faUser} className="text-gray-500 group-hover:text-sky-500" />}
                    </span>
                  )}
                </Link>
              ) : (
                <p className="text-gray-600 lg:text-lg font-bold">
                  {comment.user?.name || "Support"} 
                  {/* {comment.user && comment.user.role !== "customer" ? " | " : ""} */}
                  {comment.user && comment.user.role !== "customer" && (
                    <span className="text-xs lg:text-sm font-semibold">
                      <br />
                      {userRoleDisplay(comment.user?.role)}{" "}
                      {comment.user.role !== "customer" &&
                        <FontAwesomeIcon icon={faUserCog} className="text-gray-500" />}
                      {comment.user.role === "customer" &&
                        <FontAwesomeIcon icon={faUser} className="text-gray-500" />}
                    </span>
                  )}
                </p>
              )}

              {/* Created At */}
              <p className="text-gray-600 text-right text-xs lg:text-base">
                {formatDate(comment.createdAt)}
              </p>

            </div>
              
            {/* Edit Message Form Section */}
            {editCommentId === comment._id ? (
              <form onSubmit={handleUpdateComment}>
                <textarea
                  value={editCommentMessage}
                  onChange={(e) => setEditCommentMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2 text-sm lg:text-base"
                  required
                />
                <input
                  value={editCommentImage}
                  onChange={(e) => setEditCommentImage(e.target.value)}
                  placeholder="Provide an image of the problem if any using google drive public image url only"
                  className="w-full p-2 border border-gray-300 rounded-md mb-3 text-sm lg:text-base"
                />
                <button type="submit" className="bg-gray-600 hover:bg-gray-400 text-white text-sm lg:text-base font-bold py-2 px-4 rounded mr-2">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditCommentId(null)}
                  className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded text-sm lg:text-base"
                >
                  Cancel
                </button>
              </form>
            ) : (
              
              <div>
                {/* Message Section */}
                <div className="mt-5 mb-7 flex flex-row items-center justify-between">

                  {/* Comment Message */}
                  <p className="text-gray-600  text-sm lg:text-base">{comment.message}</p>

                  {/* Edit and Delete Buttons for Comment Message. Component is defined at the bottom*/}
                  { (comment.user?._id === user?._id || roles.includes(user?.role)) &&
                    <EditDeleteButtons user={user} comment={comment} handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} />
                  }
                </div>

                {/* Image Section */}
                {comment.imageURL && 
                  <div className="my-4 text-sm lg:text-base text-gray-600">
                    <p className="mb-2 p-3 font-semibold bg-gray-400 text-gray-800 overflow-hidden rounded-lg">
                      Comment Attachment: 
                    </p>
                    <a href={comment.imageURL} target="_blank" rel="noopener noreferrer">
                      <img src={comment?.imageURL? extractImageId(comment.imageURL) : ""}
                        className="rounded-lg border border-gray-900 lg:h-[28rem] w-full text-center p-2"
                        title="Click for the larger version."
                        alt="comment attachment image"
                      />
                    </a>
                  </div>
                }
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default Comments;

// Edit and Delete Buttons for Comment Message
export const EditDeleteButtons = ({user, comment, handleEditComment, handleDeleteComment}) => {

  return (
    <div className="flex justify-end">
      {/* Edit Comment Button */}
      { comment.user?._id === user?._id &&
          <button
              type="button"
              onClick={() => handleEditComment(comment)}
              className=" text-white font-bold py-1 px-1 rounded text-sm lg:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 lg:w-5 fill-gray-500 hover:fill-gray-700"
              viewBox="0 0 348.882 348.882">
              <path
                d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                data-original="#000000" />
              <path
                d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                data-original="#000000" />
            </svg>
          </button>
      }

      {/* Delete Comment Button */}
      <button
        type="button"
        onClick={() => handleDeleteComment(comment?._id)}
        className=" text-white font-bold py-1 px-1 rounded text-sm lg:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 lg:w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
          <path
            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
            data-original="#000000" />
          <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
            data-original="#000000" />
        </svg>
      </button>
    </div>
  );
}
