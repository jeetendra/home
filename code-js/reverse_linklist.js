// Reverse a Linked List

// function reverseLinkedList(head) {
//   let prev = null;
//   let current = head;
//   let next = null;

//   while (current) {
//     next = current.next;
//     current.next = prev;
//     prev = current;
//     current = next;
//   }

//   return prev;
// }

function reverseLinkedList(head, prev = null) {
    return head.next ? reverseLinkedList(head.next, { value: head.value, next: prev }) : { value: head.value, next: prev };    
}

console.log(reverseLinkedList({ value: 1, next: { value: 2, next: { value: 3, next: null } } })); // { value: 3, next: { value: 2, next: { value: 1, next: null } } }
