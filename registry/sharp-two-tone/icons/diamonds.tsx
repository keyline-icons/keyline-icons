import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Diamonds({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19.2071 7.7929L22.7071 11.2929C22.8946 11.4804 23 11.7348 23 12C23 12.2652 22.8946 12.5196 22.7071 12.7071L15.7071 19.7071C15.5196 19.8946 15.2652 20 15 20C14.7348 20 14.4804 19.8946 14.2929 19.7071L7.2929 12.7071C7.1054 12.5196 7 12.2652 7 12C7 11.7348 7.1054 11.4804 7.2929 11.2929L14.2929 4.2929C14.4804 4.1054 14.7348 4 15 4C15.2652 4 15.5196 4.1054 15.7071 4.2929Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 5L22 12L15 19L8 12L15 5ZM9.8787 5.8787L9 5L2 12L9 19L9.8787 18.1213"/>
    </svg>
  )
}
