// import {
//     render,
//     RenderOptions,
//     screen,
//     fireEvent,
//     waitFor,
// } from "@testing-library/react";
// import { enableFetchMocks } from "jest-fetch-mock";
// import BioEditor from ".";
// enableFetchMocks();

// const mockUpdateBio = () => {};

// const empty = "";
// const hello = "hello";

// //1
// test("Renders Add button when no bio is passed", async () => {
//     const { container } = render(
//         <BioEditor currentBio={empty} updateBio={mockUpdateBio} />
//     );
//     expect(container.querySelector("button").classList.contains("add"));
// });

// //2
// test("Renders Edit button when bio is passed", () => {
//     const { container } = render(
//         <BioEditor currentBio={hello} updateBio={mockUpdateBio} />
//     );
//     expect(container.querySelector("button").classList.contains("edit"));
// });

// //3
// test("Click on Add Button renders textarea and Save button", () => {
//     const { container } = render(
//         <BioEditor currentBio={empty} updateBio={mockUpdateBio} />
//     );

//     fireEvent.click(container.querySelector(".add"));

//     expect(
//         container.querySelector("textarea").classList.contains("editbiotext")
//     );

//     expect(container.querySelector("button").classList.contains("save"));
// });

// test("Click on Edit Button renders textarea and Save button", () => {
//     const { container } = render(
//         <BioEditor currentBio={hello} updateBio={mockUpdateBio} />
//     );

//     fireEvent.click(container.querySelector(".edit"));

//     expect(
//         container.querySelector("textarea").classList.contains("editbiotext")
//     );

//     expect(container.querySelector("button").classList.contains("save"));
// });

// test("Click on Add Button renders Save button", () => {
//     const { container } = render(
//         <BioEditor currentBio={hello} updateBio={mockUpdateBio} />
//     );

//     fireEvent.click(container.querySelector(".edit"));

//     fireEvent.click(container.querySelector(".save"));

//     //Clicking the "Save" button causes an HTTP request.
//     //The request should not actually happen during your test,
//     //and it won't because Jest has been configured to automatically use a mock of fetch in your tests.
// });

// test("Call prop updateBio function after successful fetch", async () => {
//     const { container } = render(
//         <BioEditor currentBio={hello} updateBio={mockUpdateBio} />
//     );

//     // fetch.mockResponseOnce(JSON.stringify({ success: true }));

//     fireEvent.click(container.querySelector(".edit"));

//     fireEvent.click(container.querySelector(".save"));

//     await waitFor(() => {
//         expect(fetch).toHaveBeenCalledTimes(1);
//     });

//     // expect(props.updateBio).toHaveBeenCalledTimes(1); //????
// });
