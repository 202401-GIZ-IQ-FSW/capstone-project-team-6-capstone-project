import { useState, useEffect } from "react";
import Link from "next/link";

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
        body: JSON.stringify({ message: newComment }),
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
    if (!rawImageUrl.includes("drive.google.com")) {
      return rawImageUrl;
    }
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
          placeholder="Provide an image of the problem if any using image url"
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          required
        />
        <button type="submit" className="bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
          Post
        </button>
      </form>

      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment._id} className="mb-4 bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
            
            <div className="flex justify-between mb-3 gap-4 text-sm lg:text-base">

              {/* User Name */}
              { comment?.user?._id === user?._id || user?.role === "superAdmin" || (user?.role === "admin" && !["admin", "superAdmin"].includes(comment?.user?.role)) ? (
                <Link href={`/users/view-user/${ticket.user._id}`} className="text-gray-600 lg:text-lg font-bold hover:underline hover:text-sky-500">
                  {comment.user?.name || "Support"} {comment.user && user?.role !== "customer" ? " | " + userRoleDisplay(comment.user?.role) : ""}
                </Link>
              ) : (
                <p className="text-gray-600 lg:text-lg font-bold">
                  {comment.user?.name || "Support"} {comment.user && user?.role !== "customer" ? " | " + userRoleDisplay(comment.user?.role) : ""}
                </p>
              )}

              {/* Created At */}
              <p className="text-gray-600 text-right text-xs lg:text-base">{formatDate(comment.createdAt)}</p>

            </div>

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
                  placeholder="Provide an image of the problem if any using image url"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2 text-sm lg:text-base"
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
                <p className="text-gray-600 mb-6 text-sm lg:text-base">{comment.message}</p>

                {/* Image Section */}
                {comment.imageURL && 
                  <div className="rounded-lg border-gray-900 my-4 text-sm lg:text-base">
                    <a href={comment.imageURL} target="_blank" rel="noopener noreferrer" className="rounded-lg">
                      <img src={comment?.imageURL? extractImageId(comment.imageURL) : ""}
                        className="rounded-lg lg:h-[30rem] w-full"
                        title="Click for the larger version."
                        alt="image for ticket problem"
                      />
                    </a>
                  </div>
                }
              </div>
            )}

            { (comment.user?._id === user?._id || roles.includes(user?.role)) &&
              <div className="flex justify-end gap-2">
                
                { comment.user?._id === user?._id &&
                    <button
                        type="button"
                        onClick={() => handleEditComment(comment)}
                        className="bg-gray-600 hover:bg-gray-400 text-white font-bold py-1 px-2 rounded text-sm lg:text-base"
                    >
                        Edit
                    </button>
                }

                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment._id)}
                  className="bg-red-600 hover:bg-red-400 text-white font-bold py-1 px-2 rounded text-sm lg:text-base"
                >
                  Delete
                </button>

              </div>
            }
          </div>
        ))}
    </>
  );
};

export default Comments;
