import aut from "/img/devimg.gif" 

const home = () => {
    return ( 
        <div
  className="d-flex justify-content-center align-items-center"
  
>
  <div
    className="bg-black"
    style={{
      width: "600px",
      borderRadius: "15px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      color: "gold",
    }}
  >
    <div className="row g-0 align-items-center">
      <div className="col-md-4 d-flex justify-content-center">
        <img
          src={aut}
          className="img-fluid rounded-circle m-3"
          alt="นันธวัช สงนุ้ย"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
      </div>
      <div className="col-md-8">
        <div className="card-body text-center">
          <h5 className="card-title">นันธวัช สงนุ้ย</h5>
          <p className="card-text mb-1"><strong>ชั้นปี:</strong> 2</p>
          <p className="card-text mb-1"><strong>รหัสนักศึกษา:</strong> 67108332</p>
          <p className="card-text mb-1"><strong>สาขา:</strong> วิทยาการคอมพิวเตอร์และนวัฒกรรมพัฒนาซอฟต์แวร์</p>
          <p className="card-text mb-1"><strong>สาขา:</strong> มหาวิทยาลัยศรีปทุม</p>
          <p className="card-text"><strong>แนะนำตัวเอง:</strong> ผมชื่อ:อัด เกิดและโตที่ พัทลุง </p>
          
        </div>
      </div>
    </div>
  </div>
</div>

     );
}
 
export default home;