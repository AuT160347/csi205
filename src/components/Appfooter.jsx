import ficon from "/img/ficon.png"
import igicon from "/img/igicon.png"

const Appfooter = () => {
    return ( 
        <>
        <h4 style={{color: 'gold', borderColor: 'gold'}}>SPU-SIT-CSI</h4>
        <div className="d-flex justify-content-center gap-3">
        <a href="https://www.instagram.com/nt.aut_1603?igsh=dTdueW5pbGh6MDF0" target="_blank"><img src={igicon}style={{ width: '40px', height: '40px' }}/></a>
        <a href="https://www.facebook.com/aut.nantawat.2024/" target="_blank" ><img src={ficon}style={{ width: '40px', height: '40px' }}/></a>
        </div>
        </>
     );
}
 
export default Appfooter;