// Meetings list containing meeting objects
let meetings = [
    {
        id: 1,
        parentId: 0,
        name: "The Lobby",
        text: "Welcome to the lobby! Please join the appropriate meeting to meet your assigned group.",
        children: [
            {
                id: 2,
                parentId: 1,
                name: "Diversity and Inclusion Team 1",
                text: "Hey there! Introducing the best group of the bunch...",
                children: [
                    {
                        id: 7,
                        parentId: 2,
                        name: "One on One",
                        text: "Join here for more specified side discussions involving fewer team members",
                        children: []
                    }
                ]
            },
            {
                id: 3,
                parentId: 1,
                name: "Diversity and Inclusion Team 2",
                text: "Child Meeting 2 Text",
                children: []
            },
            {
                id: 4,
                parentId: 1,
                name: "Diversity and Inclusion Team 3",
                text: "Child Meeting 3 Text",
                children: [
                    {
                        id: 5,
                        parentId: 4,
                        name: "Child Child Meeting 1",
                        text: "Child Child Meeting 1",
                        children: []
                    },
                    {
                        id: 6,
                        parentId: 4,
                        name: "Child Child Meeting 2",
                        text: "Child Child Meeting 2",
                        children: []
                    }
                ]
            }
        ]
    }
];

// Set current meeting id to 1 by default and instantiate subMeetingsIds array when page loads
let currentMeetingId = 1;
let subMeetingIds = [];

// traverse each meeting in meetings list
meetings.forEach(traverse);

/**
 * Returns meeting html
 * @param parentId
 * @param id
 * @param meetingName
 * @param meetingText
 * @returns String of meeting html
 */
function createMeeting(parentId, id, meetingName, meetingText) {
    return "<div class='meeting-item border p-3 m-3' id='" + id + "' data-parentid='" + parentId + "'>" +
        "    <div class='text-center'>" +
        "       <h1 class='meeting-name'>" + meetingName + "</h1>" +
        "       <img class='meeting-image' src='img/placeholder.jpg' alt='meeting image'>" +
        "    </div>" +
        "    <div class='text'>" + meetingText + "</div>" +
        "</div>"
}

/**
 * Recursive meeting traversal
 * @param item
 * @param index
 */
function traverse(item, index) {
    if (item.id === currentMeetingId) {
        console.log("parent " + item.parentId);
        if (parseInt(item.parentId) === 0) {
            $("#back").addClass("d-none");
        } else {
            $("#back").removeClass("d-none");
        }
        subMeetingIds = [];
        $("#child-meetings").html("");
        item.children.forEach(function (item, index) {
            subMeetingIds.push(item.id);
        });

        let meeting = $.parseHTML(createMeeting(item.parentId, item.id, item.name, item.text));

        $("#main-meeting").html(meeting);
    }

    if (subMeetingIds.includes(item.id)) {
        let childMeeting = $($.parseHTML(createMeeting(item.parentId, item.id, item.name, item.text)));
        childMeeting.on("click", function () {
            currentMeetingId = parseInt(this.id);
            subMeetingIds = [];

            meetings.forEach(traverse);
        });
        $("#child-meetings").append(childMeeting);

    }

    console.log(item.name);
    item.children.forEach(traverse);
}

// Back event listener to return to parent
$("#back").on("click", function () {

    currentMeetingId = parseInt($("#main-meeting").find(".meeting-item").attr("data-parentid"));
    subMeetingIds = [];

    meetings.forEach(traverse);
});