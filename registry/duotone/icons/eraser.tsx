import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Eraser({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13.4853 20L22 20C22.5523 20 23 20.4477 23 21C23 21.5523 22.5523 22 22 22L5.4142 22C5.149 22 4.8947 21.8946 4.7071 21.7071L1.8787 18.8787C1.3161 18.3161 1 17.553 1 16.7573C1 15.9617 1.3161 15.1986 1.8787 14.636L8 8.5147L16.4853 17L13.4853 20ZM3.2929 16.0502C3.1054 16.2378 3 16.4921 3 16.7573C3 17.0226 3.1054 17.2769 3.2929 17.4645L5.8285 20L10.6569 20L13.6569 17L8 11.3431L3.2929 16.0502Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M8 8.5147L13.636 2.8787C14.1986 2.3161 14.9617 2 15.7573 2C16.553 2 17.3161 2.3161 17.8787 2.8787L22.1213 7.1213C22.6839 7.6839 23 8.447 23 9.2427C23 10.0383 22.6839 10.8014 22.1213 11.364L16.4853 17L8 8.5147Z" fill="currentColor"/>
    </svg>
  )
}
