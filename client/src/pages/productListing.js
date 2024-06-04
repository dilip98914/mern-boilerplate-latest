import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import jwt from 'jsonwebtoken'
import { GlobalContext } from '../App';

export default function() {
    const [products, setProducts] = useState([])
    const { global, setGlobal } = useContext(GlobalContext);
    const history=useHistory()
    useEffect(async ()=>{
        await getProducts()
    },[])

    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){
            // const user=
        }else{
            history.push('/login')
            alert('you are not loggged in!')
        }
    },[])

    function logout(){
        localStorage.clear();
        history.push('/login')
    }

    async function getProducts(e) {
        // const res2 = await fetch('http://localhost:1337/api/product', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email:''
        //     })
        // })
        const res = await fetch('http://localhost:1337/api/product')
        const data = await res.json()
        console.log('sssasaasasalee', data)
        if (data) {
            setProducts(data.data)
        } else {
            alert('product not exists!')
        }

    }

    function getProduct(_id){
        return products.filter(elt=>{
            return elt._id==_id
        })[0]
    }

    function remove(_id){
        const originalCart = global.cart;
        delete originalCart[_id]
        setGlobal({
            cart:originalCart
        })

    }

    async function addToCart(item){
        const originalCart=global.cart || {};
        const {_id}=item;
        let cart={};
        //cart has some items
        if(originalCart && Object.keys(originalCart).length>0){
            if(originalCart[_id]){
                cart={
                    ...originalCart,
                    [_id]: originalCart[_id]+1
                }
            }else{
                cart = {
                    ...originalCart,
                    [_id]: 1
              }
            }
        }else{
            cart={
                [_id]:1
            }
        }
        //cart is null
        setGlobal({
            cart
        })
    }

    return (
        <div style={{
            textAlign:'center',
        }}>
            <div style={{border:'1px solid gray',maxWidth:'50vw',margin:'0 auto'}}>
                <span><button>@ cart</button></span>
                {
                    global.cart && Object.keys(global.cart).length > 0 && Object.keys(global.cart).map(elt => (
                        <p>
                            <span style={{ color: 'red' }}>{getProduct(elt).name}</span>
                            : {global.cart[elt]}
                            &nbsp;<button onClick={()=>remove(elt)}>remove</button>

                        </p>
                    ))
                }
                {
                global.cart && Object.keys(global.cart).length > 0 ? 
                        <button style={{ color: 'blue' }}>Buy Now</button>
                    :
                    null
                }
                <form action="http://localhost:1337/api/checkout-session" method="POST">
                    <input type="hidden" name='products' value={(global.cart && Object.keys(global.cart)) ? Object.keys(global.cart).join(','):[]}/>
                    <button type="submit" id="checkout-button">Checkout</button>
                </form>
            </div>

            <h2>Products</h2>
            <button style={{background:'violet',color:"white"}} onClick={logout}>logout</button>

            {
                products.length>0?
                products.map(p=>(
                    <div style={{
                      border:'1px solid black',
                      maxWidth:'200px',
                      textAlign:'center'  
                    }}>
                        <p style={{color:'red',fontWeight:'bold'}}>{p.name}</p>
                        <p>{p.description}</p>
                        <button>Buy Now</button>
                        <button onClick={
                            ()=>addToCart(p)
                            // console.log('hi')
                            }>Add to Cart</button>

                    </div> 
                )):<h1>no products!</h1>
            }

        </div>

    )
}