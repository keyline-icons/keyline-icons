import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cap({ size = 24, ...props }: IconProps) {
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
      <path d="M1 15L1 12C1 9.2022 2.2622 6.6907 4.26 4.8927C6.2561 3.0962 8.9954 2 12 2C15.0046 2 17.7439 3.0962 19.74 4.8927C21.7378 6.6907 23 9.2022 23 12L23 15L23 19.5C23 20.8808 21.8806 22 20.5 22C20.1261 22 19.7569 21.9162 19.4195 21.7545C17.1036 20.6445 14.5682 20.0683 12 20.0683C9.4318 20.0683 6.8964 20.6445 4.5805 21.7545C4.2431 21.9162 3.8739 22 3.5 22C2.1194 22 1 20.8808 1 19.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 15V19.5C2 20.3285 2.6716 21 3.5 21C3.7244 21 3.9459 20.9497 4.1483 20.8527C6.5991 19.6781 9.2822 19.0683 12 19.0683C14.7178 19.0683 17.4009 19.6781 19.8517 20.8527C20.0541 20.9497 20.2756 21 20.5 21C21.3284 21 22 20.3285 22 19.5V15M2 15V12C2 7.0294 6.4772 3 12 3M2 15C5.1686 13.6797 8.5673 13 12 13M12 3C17.5228 3 22 7.0294 22 12V15M12 3V13M22 15C18.8314 13.6797 15.4327 13 12 13"/>
    </svg>
  )
}
