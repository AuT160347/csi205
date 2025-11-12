import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Carts({ carts, setCarts }) {
    return (
        <div style={{ height: "700px" }}>
            <div className="row">
                {carts.map((cart) => {
                    return (
                        <div className="col-md-4 mb-4" >
                            <Card style={{ width: '15rem', height: '23rem', margin: 'auto' }} key={cart.id} >
                                <Card.Img
                                    variant="top"
                                    src={cart.thumbnailUrl}
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', margin: '1rem auto 0' }}
                                />
                                <Card.Body
                                    className="text-center d-flex flex-column justify-content-between"
                                    style={{ flex: "1" }}>
                                    <Card.Title>{cart.title}</Card.Title>
                                    <Card.Text>${cart.price.toFixed(2)}</Card.Text>

                                    <Button
                                        variant="outline-dark"
                                        className="w-100"
                                        onClick={() => {
                                            setCarts(carts.filter((c) => c.id !== cart.id))
                                        }}
                                    >
                                        Remove from Cart
                                    </Button>

                                </Card.Body>
                            </Card>
                        </div>)
                })}
            </div>
            <div className='p-3'>
            <h4 style={{color:"gold"}}>Item: <Badge bg='danger'>{carts.length} items</Badge> - Total Price: <Badge bg='success'>${carts.reduce((prev, cart) => { return prev + cart.price }, 0).toFixed(2)}</Badge></h4>
            <Button variant='warning p-2'>checkout <i class="bi bi-credit-card"></i></Button>
            </div>
        </div>
    );
}

export default Carts;