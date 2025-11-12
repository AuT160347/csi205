import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function Products({ products, carts, setCarts }) {
    return (
        <>
            <div className="row">
                {products.map((product) => {
                    return (
                        <div className="col-md-4 mb-4" >
                            <Card style={{ width: '15rem', height: '23rem', margin: 'auto' }} key={product.id} >
                                <Card.Img
                                    variant="top"
                                    src={product.thumbnailUrl}
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', margin: '1rem auto 0' }}
                                />
                                <Card.Body
                                    className="text-center d-flex flex-column justify-content-between"
                                    style={{ flex: "1" }}>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>${product.price.toFixed(2)}</Card.Text>
                                    <div style={{ minHeight: "3rem" }}>
                                        {carts.find((cart) => cart.id === product.id) ?
                                            (
                                                <Badge
                                                    bg='danger'
                                                    className="w-100 h-100 d-flex justify-content-center align-items-center"
                                                   >
                                                    <h6 className='mb-0'>Added to Carth</h6>
                                                </Badge>
                                            )
                                            :
                                            (
                                                <Button
                                                    variant="outline-dark"
                                                    className="w-100"
                                                    onClick={() => {
                                                        setCarts([...carts, product])
                                                    }}>
                                                    Add to Cart
                                                </Button>
                                            )}
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>)
                })}
            </div>

        </>
    );
}

export default Products;