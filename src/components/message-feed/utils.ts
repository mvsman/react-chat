export const onScrollToParentMessage = (parentId: number) => {
  const parentMessage = document.querySelector(`[data-id="${parentId}"]`);

  if (parentMessage) {
    parentMessage.scrollIntoView({ behavior: 'smooth' });
  }
};
