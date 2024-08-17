'use client'

import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import {useRouter} from "next/navigation";
import FoodCart from '@/components/food-cart/FoodCart'
import OrderCart from '@/components/order-cart/OrderCart'
import {useEffect, useState} from "react";
import Confirm from "@/components/confirm-box/Confirm";

export default function Home() {

  // Hooks
  const [time, setTime]=useState(new Date().getHours()*60+new Date().getMinutes())
  const [foodList, setFoodList]=useState<any>([])
  const [orderList, setOrderList]=useState<any>([1])
  let [totalPrice, setTotalPrice]=useState(0)
  const [comment, setComment]=useState('')
  const [showBreakfast, setShowBreakfast]=useState(true)
  const [showLunch, setShowLunch]=useState(true)
  const [shoppingCartConfirm, setShoppingCartConfirm]=useState(false)
  const router=useRouter()

  // Hide Foods
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().getHours()*60+new Date().getMinutes())
    }, 60000)

    if (time>=1900) { // 510 is breakfast show time
      setShowBreakfast(false)
    }

    if (time>=1900) { // 660 is lunch show time
      setShowLunch(false)
    }

  }, [time])

  // Fetching Data
  useEffect(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(data => {
        let i=0
        setInterval(() => {
          if (i===1) {
            setFoodList(data)
          }
          i++
        }, 1000)
      })
      .catch(err => console.log('Error: '+err))
  }, [])

  useEffect(() => {

    const price=orderList.reduce((sum: number, item: any) => {
      return sum+item.price*item.number;
    }, 0);
    setTotalPrice(price);

  }, [orderList])



  return (
    <>
      {!localStorage.getItem('isLoggedIn')&&router.push('/login')}
      {shoppingCartConfirm&&<Confirm />}
      <Navbar />
      <div className="flex justify-center items-start fixed z-10 w-[424px] min-h-[750px] top-[92px] left-[66px] ">

        {
          orderList?.length>0? (

            !shoppingCartConfirm&&false? (
              <div className="relative flex justify-center items-start w-full h-[572px] rounded-[10px] border-[0.2px] border-[#00000040] bg-white">
                <p className="absolute top-[25px] text-[20px] font-semibold">لـیـست سـفـارشـات</p>
                <div className="flex flex-col items-center justify-start absolute bottom-0 w-full h-[480px] gap-2">
                  <div className="relative w-full h-[288px]">
                    <div className="overflow-auto w-full h-[216px]">


                      {
                        // Create Order Carts
                        orderList.map((item: any, index: any) => {
                          return (<OrderCart {...item} key={item?.id} onRemove={() => {
                            orderList.splice(index, 1)
                            setOrderList([...orderList])
                          }} onChangeCount={(count: number) => {
                            item['number']=count
                          }}
                          />)
                        })
                      }

                    </div>
                    <div className="flex flex-row-reverse justify-between items-center absolute w-full h-[72px] bottom-0 border-[#00000040] border-y-[0.2px] ">
                      <p className="mr-7 w-[80px] h-6 text-[20px] text-center font-medium">هزینه کل</p>
                      <div className="flex flex-row-reverse justify-center w-[100px] h-[30px] gap-[1px] ml-7">
                        <span className="text-[20px] font-bold text-center leading-[30px]">
                          {
                            totalPrice
                          }
                        </span>
                        <span className="text-[16px] font-medium select-none text-center leading-[30px]">تومان</span>
                      </div>
                    </div>
                  </div>

                  <textarea placeholder="توضیحات سفارش..." value={comment} onChange={e => setComment(e.target.value)} className="w-[404px] h-[100px] leading-[25px] border-[0.2px] border-[#79747E] px-3 pb-[60px] pt-4 rounded-[8px] text-right placeholder:text-[#49454F] focus:outline-none text-wrap overflow-hidden" style={{direction: 'rtl', resize: 'none'}} />

                  <button className="w-[404px] h-[60px] bg-[#F6510B] text-white rounded-[5px] gap-[10px] font-medium text-[20px]  text-center leading-[60px]" onClick={() => setShoppingCartConfirm(true)}>ثــبــت سـفـارش</button>
                </div>
              </div>
            ):(
              <div className="relative flex justify-center items-start w-full h-[451px] rounded-[10px] border-[0.2px] border-[#00000040] bg-white">
                <p className="absolute top-[25px] text-[20px] font-semibold">لـیـست سـفـارشـات</p>

                <div className="absolute top-[79px] w-full h-[288px] bg-red-600">
                  <div className="flex flex-col justify-start items-center overflow-auto w-full h-[216px]">
                    {/*{
                      // Create Order Carts Accepted
                      orderList.map((item: any) => {
                        return (
                          <div key={item.id} className="flex flex-row-reverse justify-between items-end relative w-full h-[72px] border-[#00000040] border-y-[0.2px] bg-white">
                          <p className="absolute top-2 right-[10px] w-[281px] h-6 text-[18px] text-right font-semibold">{item.name}</p>
                          <div className="flex flex-row-reverse justify-start w-[120px] h-[22px] gap-[1px] mb-[7px] mr-[10px]">
                            <span className="text-[16px] font-bold text-center leading-[22px]">{item.price}</span>
                            <span className="text-[14px] font-medium select-none text-center leading-[22px]">تومان</span>
                            </div>
                            <p>1</p>
                        </div>
                        )
                        })
                        }*/}
                  </div>
                  <div className="flex flex-row-reverse justify-between items-center absolute w-full h-[72px] bottom-0 border-[#00000040] border-y-[0.2px] ">
                      <p className="mr-7 w-[80px] h-6 text-[20px] text-center font-medium">هزینه کل</p>
                      <div className="flex flex-row-reverse justify-center w-[100px] h-[30px] gap-[1px] ml-7">
                        <span className="text-[20px] font-bold text-center leading-[30px]">
                          {
                            totalPrice
                          }
                        </span>
                        <span className="text-[16px] font-medium select-none text-center leading-[30px]">تومان</span>
                      </div>
                    </div>
                </div>

                <textarea className="absolute bottom-0 w-[404px] h-[80px] bg-white leading-[25px] px-3 pb-[60px] pt-4 rounded-[8px] text-right placeholder:text-[#49454F] focus:outline-none text-wrap overflow-hidden" placeholder="بدون توضیح" value={comment} style={{direction: 'rtl', resize: 'none'}} disabled />

              </div>
            )

          ):(
            <div className="flex flex-col justify-between items-center absolute z-20 w-[190px] h-[180px] select-none mt-[285px]">
              <Image width="158" height="126" src={'no-order.svg'} alt="no-order" onDragStart={e => e.preventDefault()} />
              <p className="w-[190px] h-[28px] text-center font-extrabold text-xs font-Vazir text-nowrap text-[#BEBEBE]" onDragStart={e => e.preventDefault()}>!سبد سفارش شما خالیه</p>
            </div>
          )
        }

      </div>

      <div className="absolute w-[890px] overflow-y-auto h-auto top-[92px] right-[66px] gap-[16px] z-10">
        <div className="flex flex-nowrap justify-between items-center w-full h-[47px] gap-4">
          <div className="flex justify-between w-[304px] h-[19px]">
            <span className="h-[19px] w-[280px] text-center text-[12px] font-extrabold"> .برای ثبت سفارش تا ساعت 8:30 فرصت دارید</span>
            <Image width={16} height={16} src={'info.svg'} alt="info" />
          </div>
          <span className="h-full text-[20px] font-semibold leading-[47px]">وعــده صــبـحـانــه</span>
        </div>
        <div className="flex flex-row-reverse justify-start items-end content-start flex-wrap w-full max-h-[440px] overflow-auto z-20 box-border gap-4">
          {
            showBreakfast? (
              <>
                {
                  foodList.map((food: any) => (
                    food['number']=1,
                    food.type==='breakfast'?
                      <FoodCart key={food.id} name={food.name} title={food.title} image={food.image} price={food.price} prevPrice={food?.prevPrice? (food.prevPrice):('')}
                        onAddFood={() => setOrderList((prev: any) =>
                          prev=!prev.includes(food)&&!shoppingCartConfirm? [...prev, food]:[...prev]
                        )} />:null
                  ))
                }
              </>
            ):null
          }
        </div>

        <div className="flex flex-nowrap justify-between items-center w-full h-[47px] gap-4 ">
          <div className="flex justify-between w-[323px] h-[19px]">
            <span className="h-[19px] w-[295px] text-right text-[12px] font-extrabold">.برای ثبت سفارش فقط تا ساعت 11 فرصت دارید</span>
            <Image width={16} height={16} src={'info.svg'} alt="info" />
          </div>
          <span className="h-full text-[20px] font-semibold leading-[47px]">وعــده نــهــار </span>
        </div>

        <div className="flex flex-row-reverse justify-start items-end content-start flex-wrap w-full max-h-[440px] overflow-auto z-20 box-border gap-4">
          {
            showLunch? (
              <>
                {
                  foodList.map((food: any) => (
                    food['number']=1,
                    food.type==='lunch'?
                      <FoodCart key={food.id} name={food.name} title={food.title} image={food.image} price={food.price} prevPrice={food?.prevPrice? (food.prevPrice):('')} onAddFood={() => setOrderList((prev: any) =>
                        prev=!prev.includes(food)&&!shoppingCartConfirm? [...prev, food]:[...prev]
                      )} />:null
                  ))
                }
              </>
            ):null
          }
        </div>

      </div>

    </>
  );
}
