import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShoppingBag({ size = 24, ...props }: IconProps) {
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
      <path d="M4.0572 7H19.9428M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11M6.1 4.2C6.66656 3.44458 7.55573 3 8.5 3H15.5C16.4443 3 17.3334 3.44458 17.9 4.2L19.8 6.73333C19.9298 6.90643 20 7.11696 20 7.33333V18C20 19.6569 18.6569 21 17 21H7C5.34315 21 4 19.6569 4 18V7.33333C4 7.11696 4.07018 6.90643 4.2 6.73333L6.1 4.2Z"/>
    </svg>
  )
}
