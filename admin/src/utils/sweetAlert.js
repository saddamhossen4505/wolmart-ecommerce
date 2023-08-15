import swal from "sweetalert";

// Create sweetAlert.
export const sweetAlertBasic = (msg) => {
  swal(msg);
};

export const sweetAlertStandard = (msg, type = "success") => {
  swal(msg.title, msg.msg, type);
};

export const sweetAlertConfirmation = (msg, type = "success") => {
  swal({
    title: "Are you sure?",
    text: msg,
    icon: type,
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your file is safe!");
    }
  });
};
