<?php 
include('config.php');

$action = $_REQUEST['action'];
switch ($action) {
 case "get":
  get_all_task();
  break;

 case "add":
  add_task();
  break;
 case "del":
  delete_task();
  break; 

 case "done":
  done_task();
  break;
 case "undo":
  undo_task();
  break;
 default:
  unknown_action();
  break;
}


function get_all_task() {
  global $conn;
  $sql = "SELECT * FROM tasks";
  $tasks = array();
  while ($row = $conn->query($sql)->fetch_assoc()) {
    $tasks[] = $row;
  }
  echo json_encode($tasks);
  // $result = mysqli_query($conn, $sql);
  // $data = array();
  // while ($row = mysqli_fetch_assoc($result)) {
  //   $data[] = $row;
  // }
  // echo json_encode($data);
}

function add_task(){
  global $conn;
  $subject = $_REQUEST['subject'];
  $result = $conn->query("INSERT INTO tasks (subject, created_date) VALUES ('$subject', NOW())");
  if ($result) {
    $id = mysqli_insert_id($conn);
    echo json_encode(array("err" => 0, 'id' => $id));
  } else {
    echo json_encode(array("err" => 1, 'msg' => 'Unable to add task'));
  }
}

function delete_task(){
  global $conn;
  $id = $_POST['id'];
  $result = $conn->query("DELETE FROM tasks WHERE id = $id");
  if ($result) {
    echo json_encode(array("err" => 0));
  } else {
    echo json_encode(array("err" => 1, 'msg' => 'Unable to delete task'));
  }
}

function done_task(){
  global $conn;
  $id = $_POST['id'];
  $result = $conn->query("UPDATE tasks SET status = 1 WHERE id = $id");
  if ($result) {
    echo json_encode(array("err" => 0));
  } else {
    echo json_encode(array("err" => 1, 'msg' => 'Unable to update status task'));
  }
}

function undo_task(){
  global $conn;
  $id = $_POST['id'];
  $result = $conn->query("UPDATE tasks SET status = 0 WHERE id = $id");
  if ($result) {
    echo json_encode(array("err" => 0));
  } else {
    echo json_encode(array("err" => 1, 'msg' => 'Unable to update status task'));
  }
}

function unknown_action(){
  echo json_encode(array("err" => 1, 'msg' => 'Unknown action'));
}
?>