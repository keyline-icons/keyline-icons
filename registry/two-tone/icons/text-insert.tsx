import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TextInsert({ size = 24, ...props }: IconProps) {
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
      <path d="M7.8701 2.32C8.2478 1.91 8.8813 1.89 9.2842 2.27L11.6836 4.52C11.8852 4.71 12 4.97 12 5.25C12 5.53 11.8852 5.79 11.6836 5.98L9.2842 8.23C8.8813 8.61 8.2478 8.59 7.8701 8.18C7.4928 7.78 7.5133 7.15 7.916 6.77L8.4717 6.25H4.5996C4.2068 6.25 4 6.53 4 6.75V9C4 9.55 3.5523 10 3 10C2.4477 10 2 9.55 2 9V6.75C2 5.31 3.2256 4.25 4.5996 4.25H8.4717L7.916 3.73C7.5133 3.35 7.4928 2.72 7.8701 2.32Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M21 20C21.5523 20 22 20.45 22 21C22 21.55 21.5523 22 21 22H3C2.4477 22 2 21.55 2 21C2 20.45 2.4477 20 3 20H21ZM21 14C21.5523 14 22 14.45 22 15C22 15.55 21.5523 16 21 16H3C2.4477 16 2 15.55 2 15C2 14.45 2.4477 14 3 14H21ZM21 8C21.5523 8 22 8.45 22 9C22 9.55 21.5523 10 21 10H15C14.4477 10 14 9.55 14 9C14 8.45 14.4477 8 15 8H21ZM21 2C21.5523 2 22 2.45 22 3C22 3.55 21.5523 4 21 4H15C14.4477 4 14 3.55 14 3C14 2.45 14.4477 2 15 2H21Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
