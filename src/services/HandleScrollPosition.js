const HandleScrollPosition = (scrollInfo) =>{
    const scrollPage = sessionStorage.getItem(scrollInfo);
    if (scrollPage) {
      window.scrollTo(0, parseInt(scrollPage));
      sessionStorage.removeItem(scrollInfo);
    }
}

export default HandleScrollPosition;