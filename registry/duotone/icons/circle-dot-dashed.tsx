import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleDotDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M21.877 10.436C22.041 11.472 22.041 12.528 21.877 13.564M20.09 17.878C19.473 18.727 18.727 19.473 17.878 20.09M13.564 21.877C12.528 22.041 11.472 22.041 10.436 21.877M6.122 20.09C5.273 19.473 4.527 18.727 3.91 17.878M2.123 13.564C1.959 12.528 1.959 11.472 2.123 10.436M3.91 6.122C4.527 5.273 5.273 4.527 6.122 3.91M10.436 2.123C11.472 1.959 12.528 1.959 13.564 2.123M17.878 3.91C18.727 4.527 19.473 5.273 20.09 6.122" strokeOpacity="0.4"/>
      <path d="M14 12C14 13.105 13.105 14 12 14C10.895 14 10 13.105 10 12C10 10.895 10.895 10 12 10C13.105 10 14 10.895 14 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
