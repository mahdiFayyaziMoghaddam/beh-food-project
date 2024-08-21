'use client'

import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import {useRouter} from "next/navigation";
import FoodCart from '@/components/food-cart/FoodCart'
import OrderCart from '@/components/order-cart/OrderCart'
import {useEffect, useState, useMemo} from "react";
import Confirm from "@/components/confirm-box/Confirm";
import Accepted from "@/components/status/Accepted";
import Cooking from "@/components/status/Cooking";
import Ready from "@/components/status/Ready";

export default function Home() {

  // Hooks
  const [time, setTime]=useState(new Date().getHours()*60+new Date().getMinutes())
  const [foodList, setFoodList]=useState<any>([])
  const [orderList, setOrderList]=useState<any>([])
  const [newOrderList, setNewOrderList]=useState<any>([])
  const [totalPrice, setTotalPrice]=useState(0)
  const [comment, setComment]=useState('')
  const [showBreakfast, setShowBreakfast]=useState(true)
  const [showLunch, setShowLunch]=useState(true)
  const [shoppingCartConfirm, setShoppingCartConfirm]=useState(false)
  const [status, setStatus]=useState('')
  const router=useRouter()
  const BREAKFAST_END_TIME: number=510; // 8:30 AM
  const LUNCH_END_TIME: number=660; // 11:00 AM

  // Time update every minute
  useEffect(() => {
    const intervalId=setInterval(() => {
      setTime(new Date().getHours()*60+new Date().getMinutes());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Update visibility of breakfast and lunch items
  useEffect(() => {
    if (time>=BREAKFAST_END_TIME) setShowBreakfast(false);
    if (time>=LUNCH_END_TIME) setShowLunch(false);
  }, [time]);

  // Fetching Data
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setFoodList(data))
      .catch(err => console.log('Error: '+err));
  }, []);

  

  // Memoized Order List
  const memoOrderList=useMemo(() => (
    orderList.map((item: {id: number}, index: number) => (
      <OrderCart
        {...item}
        key={item.id}
        onRemove={() => {
          const updatedOrderList=[...orderList];
          updatedOrderList.splice(index, 1);
          setOrderList(updatedOrderList);
        }}
        onChangeCount={(count: number) => {
          const updatedOrderList=[...orderList];
          updatedOrderList[index].number=count;
          setTotalPrice(GetTotalPrice(updatedOrderList))
          //setOrderList(updatedOrderList); ==> Error!
        }}
      />
    ))
  ), [orderList]);

  // memo Create Order Cart Accepted
  const memoOrderListAccepted=useMemo<any>(() =>
    orderList.map((item: any) => {
      return (
        <div key={item.id} className="flex flex-row-reverse justify-between items-end relative w-full h-[72px] border-[#00000040] border-y-[0.2px] bg-white">
          <p className="absolute top-2 right-[10px] w-[281px] h-6 text-[18px] text-right font-semibold">{item.name}</p>
          <div className="flex flex-row-reverse justify-start w-[120px] h-[22px] gap-[1px] mb-[7px] mr-[10px]">
            <span className="text-[16px] font-bold text-center leading-[22px]">{item.price}</span>
            <span className="text-[14px] font-medium select-none text-center leading-[22px]">تومان</span>
          </div>
          <p className="absolute bottom-[7px] left-[19px]">{item.number}</p>
        </div>
      )
    })
    , [orderList])

  // Handle order status update
  useEffect(() => {
    if (shoppingCartConfirm) {
      let i=0;
      const intervalId=setInterval(() => {
        if (i===0) setStatus('Accepted');
        if (i===5) setStatus('Cooking');
        if (i===15) {
          setStatus('Ready');
          clearInterval(intervalId);
        }
        i++;
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [shoppingCartConfirm]);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      {shoppingCartConfirm&&<Confirm />}
      <Navbar />
      <div className="flex flex-wrap justify-center content-start relative z-10 w-[424px] min-h-[750px] top-[92px] 2xl:left-[66px] xl:left-[66px] lg:left-[33px] 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">

        {
          orderList?.length>0? (

            !shoppingCartConfirm? (
              <div className="relative flex justify-center items-start w-full h-[572px] rounded-[10px] border-[0.2px] border-[#00000040] bg-white">
                <p className="absolute top-[25px] text-[20px] font-semibold">لـیـست سـفـارشـات</p>
                <div className="flex flex-col items-center justify-start absolute bottom-0 w-full h-[480px] gap-2">
                  <div className="relative w-full h-[288px]">
                    <div className="overflow-auto w-full h-[216px]">
                      {memoOrderList}
                    </div>
                    <div className="flex flex-row-reverse justify-between items-center absolute w-full h-[72px] bottom-0 border-[#00000040] border-y-[0.2px] ">
                      <p className="mr-7 w-[80px] h-6 text-[20px] text-center font-medium">هزینه کل</p>
                      <div className="flex flex-row-reverse justify-center w-[100px] h-[30px] gap-[1px] ml-7">
                        <span className="text-[20px] font-bold text-center leading-[30px]">
                          {totalPrice}
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
              <>

                {status==='Accepted'? (
                  <Accepted list={orderList} />
                ):status==='Cooking'? (
                  <Cooking list={orderList} />
                ):status==='Ready'?(
                  <Ready list={orderList} />
                ):null}


                <div className="relative top-[11px] flex justify-center items-start w-full h-[451px] rounded-[10px] border-[0.2px] border-[#00000040] bg-white">
                  <p className="absolute top-[25px] text-[20px] font-semibold">لـیـست سـفـارشـات</p>

                  <div className="absolute top-[79px] w-full h-[288px] bg-white">
                    <div className="flex flex-wrap justify-center content-start overflow-auto w-full h-[216px] bg-white">
                      {memoOrderListAccepted}
                    </div>
                    <div className="flex flex-row-reverse justify-between items-center absolute w-full h-[72px] bottom-0 border-[#00000040] border-y-[0.2px] ">
                      <p className="mr-7 w-[80px] h-6 text-[20px] text-center font-medium">هزینه کل</p>
                      <div className="flex flex-row-reverse justify-center w-[100px] h-[30px] gap-[1px] ml-7">
                        <span className="text-[20px] font-bold text-center leading-[30px]">
                          {totalPrice}
                        </span>
                        <span className="text-[16px] font-medium select-none text-center leading-[30px]">تومان</span>
                      </div>
                    </div>
                  </div>

                  <textarea className="absolute bottom-0 w-[404px] h-[80px] bg-white leading-[25px] px-3 pb-[60px] pt-4 rounded-[8px] text-right placeholder:text-[#49454F] focus:outline-none text-wrap overflow-hidden" placeholder="بدون توضیح" value={comment} style={{direction: 'rtl', resize: 'none'}} disabled />
                </div>
              </>
            )
          ):(
            <div className="flex flex-col justify-between items-center absolute z-20 w-[190px] h-[180px] select-none mt-[285px]">
              <Image width="158" height="126" src={'images/no-order.svg'} alt="no-order" onDragStart={e => e.preventDefault()} />
              <p className="w-[190px] h-[28px] text-center font-extrabold text-xs font-Vazir text-nowrap text-[#BEBEBE]" onDragStart={e => e.preventDefault()}>!سبد سفارش شما خالیه</p>
            </div>
          )
        }

      </div>

      <div className="relative 2xl:w-[890px] overflow-y-auto h-auto top-[92px] 2xl:right-[66px] xl:right-[66px] gap-[16px] z-10 xl:w-[690px] lg:w-[500px] lg:right-[33px] md:w-[530px] md:right-[10px] sm:w-[530px]">
        <div className="flex flex-nowrap justify-between items-center w-full h-[47px] gap-4">
          <div className="flex justify-between w-[304px] h-[19px]">
            <span className="h-[19px] w-[280px] text-center text-[12px] font-extrabold"> .برای ثبت سفارش تا ساعت 8:30 فرصت دارید</span>
            <Image width={16} height={16} src={'images/info.svg'} alt="info" />
          </div>
          <span className="h-full text-[20px] font-semibold leading-[47px]">وعــده صــبـحـانــه</span>
        </div>
        <div className="flex flex-row-reverse 2xl:justify-start lg:justify-center xl:justify-center md:justify-center sm:justify-center items-end content-start flex-wrap w-full max-h-[440px] overflow-auto z-20 box-border gap-4">
          {
            showBreakfast? (
              <>
                {
                  foodList.map((food: any) => (
                    food['number']=1,
                    food.type==='breakfast'?
                      <FoodCart key={food.id} name={food.name} title={food.title} image={food.image} price={food.price} prevPrice={food?.prevPrice? (food.prevPrice):('')}
                        onAddFood={() => setOrderList((prev: any) =>
                          !prev.includes(food)&&!shoppingCartConfirm? ([...prev, food]):([...prev])
                        )}
                      />:null
                  ))
                }
              </>
            ):null
          }
        </div>

        <div className="flex flex-nowrap justify-between items-center w-full h-[47px] gap-4 ">
          <div className="flex justify-between w-[323px] h-[19px]">
            <span className="h-[19px] w-[295px] text-right text-[12px] font-extrabold">.برای ثبت سفارش فقط تا ساعت 11 فرصت دارید</span>
            <Image width={16} height={16} src={'images/info.svg'} alt="info" />
          </div>
          <span className="h-full text-[20px] font-semibold leading-[47px]">وعــده نــهــار </span>
        </div>

        <div className="flex flex-row-reverse 2xl:justify-start lg:justify-center xl:justify-center md:justify-center sm:justify-center items-end content-start flex-wrap w-full max-h-[440px] overflow-auto z-20 box-border gap-4">
          {
            showLunch? (
              <>
                {
                  foodList.map((food: any) => (
                    food['number']=1,
                    food.type==='lunch'?
                      <FoodCart key={food.id} name={food.name} title={food.title} image={food.image} price={food.price} prevPrice={food?.prevPrice? (food.prevPrice):('')} onAddFood={() => setOrderList((prev: any) =>
                        !prev.includes(food)&&!shoppingCartConfirm? ([...prev, food]):([...prev])
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

// Get Total Price Component
const GetTotalPrice = (list:any) => {
    const price=list.reduce((sum: number, item: any) => {
      return sum+item.price*item.number;
    }, 0);

  return price
}