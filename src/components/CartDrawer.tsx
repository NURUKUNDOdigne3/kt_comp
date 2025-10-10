"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

export function CartDrawer() {
  const { items, itemCount, totalAmount, updateQuantity, removeItem, isCartOpen, setIsCartOpen } = useCart();
  
  const tax = totalAmount * 0.18; // 18% VAT in Rwanda
  const total = totalAmount + tax;

  return (
    <Drawer open={isCartOpen} onOpenChange={setIsCartOpen} direction="right">
      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6" />
                <DrawerTitle>Shopping Cart</DrawerTitle>
              </div>
              <DrawerClose asChild>
                <button
                  className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </DrawerClose>
            </div>
            <DrawerDescription>
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 py-3 border-b"
                >
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      RWF {item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Remove item"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
            )}
          </div>

          {items.length > 0 && (
            <DrawerFooter>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>RWF {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (18% VAT)</span>
                    <span>RWF {tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium">
                    <span>Total</span>
                    <span>RWF {total.toLocaleString()}</span>
                  </div>
                </div>
                <Link href="/checkout">
                  <button
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Checkout
                  </button>
                </Link>
                <button
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}