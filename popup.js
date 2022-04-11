const btn=document.querySelector('.changeColorBtn');
const colorGrid=document.querySelector('.colorGrid');
const colorValue=document.querySelector('.colorValue');



btn.addEventListener('click', async ()=>{

    


    let [tab] =await chrome.tabs.query({active:true, currentWindow:true});
    
    chrome.scripting.executeScript({
        target:{ tabId :tab.id},
        function:pickColor,
    }, async (injectionResult)=>{
        const [data] = injectionResult;
        if(data.result){
            const color=data.result.sRGBHex;
            colorGrid.style.backgroundColor=color;
            colorValue.innerHTML=color;
            try{
                await navigator.clipboard.writeText(color);
            }
            catch(err){ 
                console.log(err);
            }

           

        }


        


    });
});

async function pickColor() {
    console.log('sab shi hai');
    try {

        const eyeDropper=new EyeDropper();
        return await eyeDropper.open();
        console.log(selectedColor);

        
    } catch (error) {
        console.log(error);
        
    }
}


