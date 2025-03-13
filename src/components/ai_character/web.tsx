const WebView = () => {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <iframe
          src="http://localhost:5173/"
          title="WebView"
          className="w-full h-full border-none"
        />
      </div>
    );
  };
  
  export default WebView;
  