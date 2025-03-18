class SwipeHandler {
  constructor(navigation) {
    this.navigation = navigation; // Assign navigation prop
  }

  handleSwipe = (event, leftScreen, rightScreen) => {
    const translationX = event.nativeEvent.translationX;

    if (translationX < -50 && leftScreen) {
      this.navigation.navigate(leftScreen);  // Swipe left to navigate
    } else if (translationX > 50 && rightScreen) {
      this.navigation.navigate(rightScreen); // Swipe right to navigate
    }
  };
}

export default SwipeHandler;

