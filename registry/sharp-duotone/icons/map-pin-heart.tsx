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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18.7081 16L12.7454 22.6667C12.3478 23.1111 11.6522 23.1111 11.2546 22.6667L5.2918 16C3.857 14.3958 3 12.1523 3 10C3 5.1675 7.1675 1 12 1C16.8325 1 21 5.1675 21 10C21 12.1523 20.143 14.3958 18.7081 16Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 14.841C10.1796 13.2862 8.01 11.9483 8.01 9.9533C8.01 8.6861 9.0818 7.659 10.404 7.659C11.0025 7.659 11.5382 7.8768 12 8.2575C12.4618 7.8768 12.9975 7.659 13.596 7.659C14.9182 7.659 15.99 8.6861 15.99 9.9533C15.99 11.9483 13.8204 13.2862 12 14.841Z"/>
    </svg>
  )
}
