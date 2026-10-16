import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleProgressPlay({ size = 24, ...props }: IconProps) {
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
      <path d="M17.8778 3.9098C18.7268 4.5266 19.4734 5.2732 20.0902 6.1222M21.8769 10.4357C22.041 11.4721 22.041 12.5279 21.8769 13.5643M20.0902 17.8778C19.4734 18.7268 18.7268 19.4734 17.8778 20.0902" strokeOpacity="0.4"/>
      <path d="M12 22C6.4772 22 2 17.5229 2 12C2 6.4772 6.4772 2 12 2"/>
      <path d="M7.962734 9.105541C7.962734 7.53467 9.690636 6.576985 11.022732 7.409545L16.332265 10.728003C17.272267 11.315504 17.272267 12.684496 16.332265 13.271998L11.022732 16.590456C9.690636 17.423016 7.962734 16.465331 7.962734 14.89446Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
