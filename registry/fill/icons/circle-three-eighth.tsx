import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleThreeEighth({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM16.9498 7.0502C15.6841 5.7846 13.9328 5 12 5C11.4477 5 11 5.4477 11 6L11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071L15.5355 16.9497C15.723 17.1372 15.9774 17.2426 16.2426 17.2426C16.5078 17.2426 16.7621 17.1373 16.9497 16.9497C18.2625 15.637 19 13.8565 19 12C19 10.0672 18.2154 8.3159 16.9498 7.0502Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
