import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Clock5({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.9249 23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1ZM11 6L11 12C11 12.1755 11.0462 12.348 11.134 12.5L13.634 16.8301C13.7666 17.0598 13.985 17.2274 14.2412 17.296C14.4974 17.3647 14.7703 17.3287 15 17.1961C15.4783 16.92 15.6422 16.3084 15.366 15.8301L13 11.732L13 6C13 5.4477 12.5523 5 12 5C11.4477 5 11 5.4477 11 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
