import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MapPinHeart({ size = 24, ...props }: IconProps) {
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
      <path d="M17.9628 15.3333L12 22L6.0372 15.3333C4.7253 13.8666 4 11.9678 4 10C4 5.5817 7.5817 2 12 2C16.4183 2 20 5.5817 20 10C20 11.9678 19.2747 13.8666 17.9628 15.3333ZM12 14.841C10.1796 13.2862 8.01 11.9483 8.01 9.9533C8.01 8.6861 9.0818 7.659 10.404 7.659C11.0025 7.659 11.5382 7.8768 12 8.2575C12.4618 7.8768 12.9975 7.659 13.596 7.659C14.9182 7.659 15.99 8.6861 15.99 9.9533C15.99 11.9483 13.8204 13.2862 12 14.841Z"/>
    </svg>
  )
}
