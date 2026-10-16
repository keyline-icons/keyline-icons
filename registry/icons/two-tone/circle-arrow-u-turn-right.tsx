import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleArrowUTurnRight({ size = 24, ...props }: IconProps) {
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
      <path d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 2C17.5228 2 22 6.4772 22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2Z"/>
      <path d="M15.6993 10.5H11.0797C9.37884 10.5 8 11.8431 8 13.5C8 15.1569 9.37884 16.5 11.0797 16.5H12.1063M13.1329 7.5L15.8497 10.1464C16.0501 10.3417 16.0501 10.6583 15.8497 10.8536L13.1329 13.5"/>
    </svg>
  )
}
