import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SwatchBook({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 17L3 5C3 3.8954 3.8954 3 5 3L9 3C10.1046 3 11 3.8954 11 5L11 17C11 19.2091 9.2091 21 7 21C4.7909 21 3 19.2091 3 17ZM10.0642 19.5712L17.7776 10.3786C18.4876 9.5325 18.3773 8.271 17.5311 7.561L14.4669 4.9898C13.6208 4.2798 12.3593 4.3902 11.6493 5.2363L11 6.0101M7.6946 20.9392L19.347 18.8846C20.4348 18.6928 21.1611 17.6555 20.9693 16.5677L20.2748 12.6285C20.0829 11.5407 19.0456 10.8143 17.9578 11.0061L17.1284 11.1524"/>
      <path d="M6 17C6 17.5523 6.4477 18 7 18C7.5523 18 8 17.5523 8 17C8 16.4477 7.5523 16 7 16C6.4477 16 6 16.4477 6 17Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
