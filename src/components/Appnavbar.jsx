import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const initPage = 'home'

function Appnavbar({ products, carts, setToken }) {
    const homeRef = useRef()
    const calculatorRef = useRef()
    const animetionRef = useRef()
    const componentsRef = useRef()
    const todosRef = useRef()
    const productsRef = useRef()
    const cartsRef = useRef()

    const [menu, setMenu] = useState('')

    useEffect(() => {
        setMenu(initPage)
    }, [])

    useEffect(() => {
        if (menu === 'calculator') calculatorRef.current.click()
        else if (menu === 'animetion') animetionRef.current.click()
        else if (menu === 'components') componentsRef.current.click()
        else if (menu === 'todos') todosRef.current.click()
        else if (menu === 'products') productsRef.current.click()
        else if (menu === 'carts') cartsRef.current.click()
        else homeRef.current.click()
    }, [menu])
    return (
        <div className="d-flex justify-content-center gap-2">
            <Link to={'home'}>
                <Button
                    variant={menu === 'home' ? 'dark' : 'outline-dark'}
                    style={{ color: 'gold', borderColor: 'gold' }}
                    onClick={() => setMenu('home')}
                    ref={homeRef}
                >Home
                </Button>
            </Link>
            <Link to={'animetion'}>
                <Button
                    variant={menu === 'animetion' ? 'dark' : 'outline-dark'}
                    style={{ color: 'gold', borderColor: 'gold' }}
                    onClick={() => setMenu('animetion')}
                    ref={animetionRef}
                >Animetion
                </Button>
            </Link>
            <Link to={'calculator'}>
                <Button
                    variant={menu === 'calculator' ? 'dark' : 'outline-dark'}
                    style={{ color: 'gold', borderColor: 'gold' }}
                    onClick={() => setMenu('calculator')}
                    ref={calculatorRef}
                >Calculator
                </Button>
            </Link>
            <Link to={'components'}>
                <Button
                    variant={menu === 'components' ? 'dark' : 'outline-dark'}
                    style={{ color: 'gold', borderColor: 'gold' }}
                    onClick={() => setMenu('components')}
                    ref={componentsRef}
                >Components
                </Button>
            </Link>
            <Link to={'todos'}>
                <Button
                    variant={menu === 'todos' ? 'dark' : 'outline-dark'}
                    style={{ color: 'gold', borderColor: 'gold' }}
                    onClick={() => setMenu('todos')}
                    ref={todosRef}
                >Todos
                </Button>
            </Link>
            <Link to={'products'}>
                <Button
                    variant={menu === 'products' ? 'dark' : 'outline-dark'}
                    style={{ color: 'gold', borderColor: 'gold' }}
                    onClick={() => setMenu('products')}
                    ref={productsRef}
                >Products ({products.length})
                </Button>
            </Link>
            <Link to={'carts'}>
                <Button
                    variant={menu === 'carts' ? 'dark' : 'outline-dark'}
                    style={{ color: 'gold', borderColor: 'gold' }}
                    onClick={() => setMenu('carts')}
                    ref={cartsRef}
                    className="position-relative"
                >
                    Carts
                    {carts.length > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {carts.length < 10 ? carts.length : '9+'}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    )}
                </Button>
            </Link>
            <Button
                variant="outline-danger"
                onClick={() => { setToken('') }}
            >
                Logout
            </Button>
        </div>
    );
}

export default Appnavbar;