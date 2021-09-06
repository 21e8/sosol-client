import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

export const displayError = (err) => {
  if (err.errors) {
    console.log(err.errors);
    err.errors.forEach((err) => toast.error(err.message));
    return;
  }
  let e = err.message.split(":");
  e = e.length === 1 ? e[0] : e[1];
  toast.error(e.trim().replace(".", ""));
};

export const sortFn = (a, b) => {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA < dateB ? 1 : -1;
};

export const setDate = (date) => {
  date = moment.utc(date).valueOf();
  const newDate = new Date(0);
  newDate.setUTCSeconds(date / 1000);
  return newDate;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "sosol-build");

  let toastId = null;
  const { data } = await axios.request({
    method: "POST",
    url: process.env.REACT_APP_CLOUDINARY_URL,
    data: formData,
    onUploadProgress: (p) => {
      const progress = p.loaded / p.total;

      if (toastId === null) {
        toastId = toast("Upload in progress", {
          progress,
          bodyClassName: "upload-progress-bar",
        });
      } else {
        toast.update(toastId, {
          progress,
        });
      }
    },
  });

  toast.dismiss(toastId);

  return data.secure_url;
};
