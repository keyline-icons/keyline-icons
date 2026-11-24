import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleFiveEighth({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM16.9498 7.0502C15.6841 5.7846 13.9328 5 12 5C11.4477 5 11 5.4477 11 6L11 11.5858L7.0503 15.5355C6.8628 15.723 6.7574 15.9774 6.7574 16.2426C6.7574 16.5078 6.8627 16.7621 7.0503 16.9497C8.363 18.2625 10.1435 19 12 19C15.8661 19 19 15.8661 19 12C19 10.0672 18.2154 8.3159 16.9498 7.0502Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
