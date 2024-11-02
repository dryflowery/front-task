<script>

</script>
  
<main>
    <div id="menu-toggle-container">
        <img src="assets\menu.png" alt="" id="menu-toggle-icon">
    </div>
    
    <div id="site-icon-container">
        <div id="site-icon"></div>
    </div>

    <div id="site-name-container">
        <div id="site-name">MoleuGo</div>
    </div>

    <div id="sign-in-container">
        <button id="sign-in-button">Sign In</button>
    </div>
</main>
  
<style>
    main {
        height: 80px;
        display: flex;
        border-bottom: 1px solid #8d8d8d;
        background-color: #000000; 
    }

    #menu-toggle-container {
        padding: 27.5px 0px 0px 30px;
    }

    #menu-toggle-icon {
        cursor: pointer;
    }

    #site-icon-container {
        padding: 15px 0px 0px 25px;
    }

    #site-icon {
        width: 40px;       
        height: 40px;
        border-radius: 50%;
        border: 5px solid #3d444d;
        background-color: #8d8d8d;
        cursor: pointer;
    }

    #site-name-container {
        padding: 25px 0px 0px 15px;
    }

    #site-name {
        color: #FFFFFF;
        font-size: 1.5rem;
        cursor: pointer;
    }

    #sign-in-container {
        padding: 20px 0px 0px 1550px;
    }

    #sign-in-button {
        padding: 10px 20px; 
        background-color: #000000; 
        color: white;             
        border: 1px solid white;          
        border-radius: 10px;            
        cursor: pointer;         
        font-size: 1rem; 
    }

    #sign-in-button:hover {
        background-color: #3d444d; 
    }   
</style>