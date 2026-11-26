import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanBoxOff({ size = 24, ...props }: IconProps) {
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
      <path d="M12 17C11.844 17 11.689 16.964 11.546 16.891L7.546 14.854C7.211 14.684 7 14.339 7 13.963V10.037C7 9.844 7.055 9.66 7.154 9.503L12 12V17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 8V6C3 5.172 3.336 4.422 3.879 3.879M20.121 20.121C19.578 20.664 18.828 21 18 21H16M8 21H6C4.343 21 3 19.657 3 18V16M16 3H18C19.657 3 21 4.343 21 6V8M7.154 9.503L12 12V17C11.845 17 11.689 16.964 11.546 16.891L7.546 14.854C7.211 14.684 7 14.339 7 13.963V10.037C7 9.661 7.211 9.316 7.546 9.146L8.606 8.606M13.089 7.432L16.454 9.146C16.789 9.316 17 9.661 17 10.037V11.343M2 2L22 22"/>
    </svg>
  )
}
