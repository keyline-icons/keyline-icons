import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LocateOff({ size = 24, ...props }: IconProps) {
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
      <path d="M11 18.9291C7.9283 18.4846 5.5154 16.0717 5.0709 13L1 13L1 11L5.0709 11C5.2857 9.5038 5.9803 8.1178 7.0503 7.0503L16.9498 16.9498C15.8822 18.0197 14.4962 18.7143 13 18.9291L13 23L11 23L11 18.9291ZM13 5.0709C16.0717 5.5154 18.4846 7.9283 18.9291 11L23 11L23 13L18.9291 13C18.8419 13.6104 18.6739 14.2065 18.4294 14.7726L9.2274 5.5706C9.7935 5.3261 10.3896 5.1581 11 5.0709L11 1L13 1L13 5.0709Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
